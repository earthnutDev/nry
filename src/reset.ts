import { isUndefined } from 'a-type-of-js';
import { command } from './command';
import { qqi } from './qqi';
import { exitProgram } from './utils';
import { getOriginData } from './data/getOriginData';

/**  重制项  */
export async function reset() {
  if (!qqi.available)
    return await exitProgram('当前读写权限受限，正在退出程序');
  const tip = ['退出', '重置'];

  const result = await command.question({
    text: '请确认是否执行覆盖原数据，该操作无法复原',
    tip,
  });

  if (isUndefined(result) || result === tip[0])
    return await exitProgram('好的，这就退出重置');

  const writeResponse = qqi.write('config', getOriginData(true));

  if (writeResponse) return await exitProgram('写入成功，退出程序');
  return await exitProgram('重置未能完成，原因未知');
}
