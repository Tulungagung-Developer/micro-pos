import { Module } from '@nestjs/common';
import { ControllerModule } from '@ctrl/controller.module';

@Module({
  imports: [ControllerModule],
  providers: [],
  exports: [],
})
export class MainModule {}
