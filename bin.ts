#!/usr/bin/env node

import { dog } from 'src/dog';
import { main } from './src/main';

(async () => {
  try {
    await main();
  } catch (error) {
    dog.error('系统级捕获 错误', error);
  }
})();
