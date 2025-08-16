#!/usr/bin/env node

import { dog } from 'src/aided/dog';
import { main } from './src/main';

(async () => {
  try {
    await main();
  } catch (error) {
    dog.error('系统级捕获 错误', error);
    console.log('当前出现未知错误', error);
  }
})();
