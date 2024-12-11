import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MainModule } from './main.module';

async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: true });
  const app = await NestFactory.create<NestFastifyApplication>(MainModule, fastify);
  await app.listen({ host: '0.0.0.0', port: 3000 });
}

void bootstrap();
