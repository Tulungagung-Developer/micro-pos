import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Routes } from '@ctrl/controller.route';
import { RootController } from '@ctrl/root.controller';

@Module({
  imports: [RouterModule.register(Routes)],
  controllers: [RootController],
})
export class ControllerModule {}
