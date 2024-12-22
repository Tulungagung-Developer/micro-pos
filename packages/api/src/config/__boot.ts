import { MakeEnv } from '@conf/env.config';

MakeEnv.initialize({
  pathEnv: '../../.env',
  ensureKeys: [
    'SERVER_PORT',
    'DEBUG',
    'JWT_SECRET',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
    'DATABASE_SSL',
    'MAIL_HOST',
    'MAIL_USERNAME',
    'MAIL_PASSWORD',
  ],
});
