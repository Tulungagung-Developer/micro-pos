import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@db/entities/core/user.entity';
import { EnvConfig } from '@conf/env.config';
import { UserAbility } from '@core/services/rbac.service';

type JwtPayload = {
  sub: string;
  iat: number;
};

export type AuthenticatedPayload = {
  user: User;
  ability: UserAbility;
};

@Injectable()
export class GuardService extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvConfig.get('JWT_SECRET').value,
    });
  }

  async validate(payload: JwtPayload, done: any) {
    const user = await User.findOne({ where: { id: payload.sub } });
    if (!user) return done(new UnauthorizedException(), false);

    return done(null, user);
  }
}
