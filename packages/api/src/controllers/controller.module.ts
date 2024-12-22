import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Routes } from '@ctrl/controller.route';
import { RootController } from '@ctrl/root.controller';
import { AuthModule } from '@ctrl/auth/auth.module';

@Module({
  imports: [RouterModule.register(Routes), AuthModule],
  controllers: [RootController],
})
export class ControllerModule {}
