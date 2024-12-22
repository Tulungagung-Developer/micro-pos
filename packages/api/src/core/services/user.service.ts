import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeUserOTP, User } from '@db/entities/core/user.entity';
import {
  AuthChangePassword,
  AuthLoginDto,
  AuthRequestForgotPassword,
  AuthVerifyForgotPassword,
} from '@core/dto/auth.dto';
import { EntityManager } from 'typeorm';
import { Crypt } from '@lib/utils/crypt.util';
import { Connector } from '@lib/typeorm/connector.typeorm';
import { hasPassed, time } from '@lib/utils/time.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvConfig } from '@conf/env.config';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwt: JwtService,
    private readonly mailer: MailerService,
  ) {}

  async attempt(dto: AuthLoginDto, manager: EntityManager) {
    const user = await manager
      .getRepository(User)
      .findOneOrFail({ where: { email: dto.email }, lock: { mode: 'dirty_read' } });

    const isValid = Crypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Password mismatched');

    return user;
  }

  async createAccessToken(user: User) {
    const cacheKey = `auth_token_${user.id}`;

    const cachedToken = await this.cacheManager.get<string>(cacheKey);
    if (cachedToken) return JSON.parse(cachedToken);

    const access_token = this.jwt.sign({ sub: user.id });
    const expires_at = time().add(7, 'days').toDate();

    await this.cacheManager.set(cacheKey, JSON.stringify({ access_token, expires_at }), 1000 * 3600);

    return {
      access_token,
      expires_at,
    };
  }

  async login(dto: any) {
    return Connector<{ access_token: string; expires_at: Date }>(async (em: EntityManager) => {
      const user = await this.attempt(dto, em);
      return this.createAccessToken(user);
    });
  }

  async requestForgotPassword(dto: AuthRequestForgotPassword) {
    return Connector(async (em: EntityManager) => {
      const user = await em.getRepository(User).findOneOrFail({ where: { email: dto.email } });
      await user.generateOTP(TypeUserOTP.FORGOT_PASSWORD);
      await em.getRepository(User).save(user);

      const url = new URL(`${EnvConfig.get('FRONTEND_URL').value}/auth/forgot-password/verify`);
      url.searchParams.set('email', user.email);
      url.searchParams.set('code', user.otp);

      void this.mailer.sendMail({
        to: user.email,
        text: `Hy there, you're requesting to reset your password. Please click url bellow to reset your password: ${url.toString()}`,
      });
    });
  }

  async verifyForgotPassword(dto: AuthVerifyForgotPassword) {
    const user = await User.findOneOrFail({ where: { email: dto.email, otp: dto.code } });

    const isValidType = user.otp_type === TypeUserOTP.FORGOT_PASSWORD;
    const isValidTime = hasPassed(user.otp_expires_at);

    user.clearOTP();
    await User.save(user);

    if (!isValidType) throw new UnauthorizedException('OTP is invalid');
    if (!isValidTime) throw new UnauthorizedException('OTP has been expired');

    return this.createAccessToken(user);
  }

  async authChangePassword(user: User, dto: AuthChangePassword) {
    return Connector(async (em: EntityManager) => {
      user.password = Crypt.hash(dto.password);
      await em.getRepository(User).save(user);

      await this.cacheManager.del(`auth_token_${user.id}`);
    });
  }
}
