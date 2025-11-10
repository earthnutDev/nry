import { isBusinessEmptyString } from 'a-type-of-js';
import { cursorShow, typewrite } from 'a-node-tools';
import { command } from './command';

/**  退出程序  */
export async function exitProgram(
  str: string = '好的，即将退出',
): Promise<never> {
  if (!isBusinessEmptyString(str)) await typewrite(str);

  cursorShow();
  return command.end();
}

/** 必须有尾斜杠 */
export function mustEndWithSlash(value: string) {
  return value.endsWith('/') ? value : value + '/';
}
