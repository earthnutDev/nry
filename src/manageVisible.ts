import { isUndefined } from 'a-type-of-js';
import { command } from './command';
import { getOriginData } from './data/getOriginData';
import { qqi } from './qqi';
import { exitProgram } from './utils';
import { dog } from './dog';
import { getCurrentRegistry } from './getCurrentRegistry';

/**  当前可见性的更改  */
export async function manageVisible() {
  if (!qqi.available) return await exitProgram('当前读写受限，即将退出程序。');

  const originData = getOriginData();
  /**  当前设置项  */
  const currentValue = await getCurrentRegistry();

  const result = await command.selection(
    {
      data: originData.map(e => ({
        ...e,
        checked: !e.disable,
        disable: e.value === currentValue,
      })),
      kind: 'check',
    },
    'number',
  );
  dog('交互结果', result);

  if (isUndefined(result)) return await exitProgram('好的，将退出状态显隐管理');

  originData.forEach((e, i) => {
    e.disable = !result.includes(i);
  });

  dog('保存前的数据', originData);
  qqi.write('config', originData);
}
