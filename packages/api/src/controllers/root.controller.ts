import { Controller, Get } from '@nestjs/common';
import { AbstractController } from '@ctrl/abstract.controller';

@Controller()
export class RootController extends AbstractController {
  @Get()
  getHello() {
    return { message: 'Micro-POS API' };
  }
}
