import '@conf/__boot';

import { EnvConfig } from '@conf/env.config';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmLoggerContainer } from '@lib/typeorm/logger.typeorm';
import { NamingStrategy } from '@lib/typeorm/naming.typeorm';

export const DatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: EnvConfig.const.DATABASE.HOST,
  port: EnvConfig.const.DATABASE.PORT,
  username: EnvConfig.const.DATABASE.USERNAME,
  password: EnvConfig.const.DATABASE.PASSWORD,
  database: EnvConfig.const.DATABASE.NAME,
  entities: [__dirname + '/../database/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/../database/subscribers/**/*{.ts,.js}'],
  logging: EnvConfig.const.DEBUG,
  logger: TypeOrmLoggerContainer.ForConnection(EnvConfig.const.DEBUG ? 'all' : []),
  namingStrategy: new NamingStrategy(),
  ssl: EnvConfig.const.DATABASE.SSL,
};
