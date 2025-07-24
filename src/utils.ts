import { isBusinessEmptyString } from 'a-type-of-js';
import { command } from './command';
import { cursorShow, typewrite } from 'a-node-tools';
import { PkgManager } from './types';

/**  退出程序  */
export async function exitProgram(
  str: string = '好的，即将退出',
): Promise<never> {
  if (!isBusinessEmptyString(str)) await typewrite(str);

  cursorShow();
  return command.end();
}

/**  检测当前的启动执行  */
export function detectPackageManager(): PkgManager {
  // const _ = (test: string) => Boolean(getDirectoryBy(test, 'file'));

  // /**  判断是否存在 pnpm 的锁文件  */
  // if (_('pnpm-lock.yaml')) return 'pnpm';
  // /**  判断是否有 yarn 的锁文件  */ else if (_('yarn.lock')) return 'yarn';
  // /**  判断是否有 npm 的锁文件  */ else if (_('package-lock.json'))
  //   return 'npm';

  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('yarn')) return 'yarn';
  if (userAgent.includes('npm')) return 'npm';

  // 2. 检测环境变量
  if (process.env.PNPM_HOME) return 'pnpm';
  if (process.env.YARN_IGNORE_PATH) return 'yarn';

  return 'npm';
}
