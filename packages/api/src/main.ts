import '@conf/__boot'; // let it be here :D

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MainModule } from './main.module';
import { EnvConfig } from '@conf/env.config';
import { FastifyConfig } from '@conf/fastify.config';
import { ValidationPipe } from '@nestjs/common';
import { RequestInterceptor } from '@core/interceptor/request.interceptor';
import { ResponseInterceptor } from '@core/interceptor/response.interceptor';
import { ExceptionFilter } from '@core/filter/exception.filter';
import { ValidatorConfig } from '@conf/validator.config';
import { TypeormFilter } from '@core/filter/typeorm.filter';
import { Logger } from 'nestjs-pino';
import { HttpFilter } from '@core/filter/http.filter';

async function bootstrap() {
  const adapter = new FastifyAdapter(FastifyConfig);

  const app = await NestFactory.create<NestFastifyApplication>(MainModule, adapter, { bufferLogs: true });

  // ===== Where to place all fastify plugins =====
  // =====

  // ===== Where to place all NestJS global pipes, interceptors, guards, etc. =====
  app.useGlobalPipes(new ValidationPipe(ValidatorConfig));
  app.useGlobalFilters(new ExceptionFilter(), new TypeormFilter(), new HttpFilter());
  app.useGlobalInterceptors(new RequestInterceptor(), new ResponseInterceptor());

  if (EnvConfig.const.IS_PRODUCTION) {
    app.useLogger(app.get(Logger));
  }
  // =====

  await app.listen({ host: '0.0.0.0', port: EnvConfig.const.PORT });
}

void bootstrap();
