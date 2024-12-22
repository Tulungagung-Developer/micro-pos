import { Routes as NestRoutes } from '@nestjs/core';
import { AuthModule } from '@ctrl/auth/auth.module';

export const Routes: NestRoutes = [{ path: '/auth', module: AuthModule }];
