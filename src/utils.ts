import { isBusinessEmptyString } from 'a-type-of-js';
import { command } from './command';
import { cursorShow, typewrite } from 'a-node-tools';

/**  退出程序  */
export async function exitProgram(
  str: string = '好的，即将退出',
): Promise<never> {
  if (!isBusinessEmptyString(str)) await typewrite(str);

  cursorShow();
  return command.end();
}
