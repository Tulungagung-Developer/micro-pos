import { Module } from '@nestjs/common';
import { GuardService } from '@core/services/guard.service';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfig } from '@conf/env.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from '@conf/mail.config';
import { UserService } from '@core/services/user.service';

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
  providers: [GuardService, UserService],
  exports: [GuardService, UserService],
})
export class CoreModule {}
