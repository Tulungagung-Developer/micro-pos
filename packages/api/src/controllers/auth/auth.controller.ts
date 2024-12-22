import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AbstractController } from '@ctrl/abstract.controller';
import {
  AuthChangePassword,
  AuthLoginDto,
  AuthRequestForgotPassword,
  AuthVerifyForgotPassword,
} from '@core/dto/auth.dto';
import { UserService } from '@core/services/user.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Me } from '@core/decorator/user.decorator';
import { User } from '@db/entities/core/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AuthController extends AbstractController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('/login')
  async login(@Body() body: AuthLoginDto) {
    return this.userService.login(body);
  }

  @Post('/forgot-password')
  async requestForgotPassword(@Body() body: AuthRequestForgotPassword) {
    return this.userService.requestForgotPassword(body);
  }

  @Get('/forgot-password/verify')
  async verifyForgotPassword(@Query() query: AuthVerifyForgotPassword) {
    return this.userService.verifyForgotPassword(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-password')
  async changePassword(@Body() body: AuthChangePassword, @Me() user: User) {
    return this.userService.authChangePassword(user, body);
  }
}
