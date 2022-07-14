import * as path from 'path';

import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1657724068954_2003',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  orm: {
    type: 'sqlite',
    database: path.join(__dirname, '../../test.db'),
    synchronize: false,
    logging: false,
  },
  jwt: {
    secret: '123456',
    expiresIn: 60 * 60 * 24,
  },
} as MidwayConfig;
