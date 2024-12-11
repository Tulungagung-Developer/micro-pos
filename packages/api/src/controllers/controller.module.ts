import { Module } from '@nestjs/common';
import { RootModule } from '@ctrl/root/root.module';
import { RouterModule } from '@nestjs/core';
import { Routes } from '@ctrl/controller.route';

@Module({
  imports: [RouterModule.register(Routes), RootModule],
  exports: [RouterModule],
})
export class ControllerModule {}
