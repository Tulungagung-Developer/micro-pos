import '@conf/__boot'; // let it be here :D

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MainModule } from './main.module';
import { EnvConfig } from '@conf/env.config';
import { FastifyConfig, FastifyCookieSigner } from '@conf/fastify.config';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const adapter = new FastifyAdapter(FastifyConfig);

  const app = await NestFactory.create<NestFastifyApplication>(MainModule, adapter, { bufferLogs: true });

  // ===== Where to place all fastify plugins =====
  await app.register(fastifyCookie, { secret: FastifyCookieSigner });
  // =====

  // ===== Where to place all NestJS global pipes, interceptors, guards, etc. =====
  // =====

  await app.listen({ host: '0.0.0.0', port: EnvConfig.const.PORT });
}

void bootstrap();
