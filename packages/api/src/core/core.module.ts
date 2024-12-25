import { Module } from '@nestjs/common';
import { GuardService } from '@core/services/guard.service';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfig } from '@conf/env.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from '@conf/mail.config';
import { UserService } from '@core/services/user.service';
import { RbacService } from '@core/services/rbac.service';
import { AbilityGuard } from '@core/guard/ability.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: EnvConfig.get('JWT_SECRET').value,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    MailerModule.forRoot(MailConfig),
  ],
  providers: [AbilityGuard, GuardService, RbacService, UserService],
  exports: [GuardService, UserService, RbacService],
})
export class CoreModule {}
