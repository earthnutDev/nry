import { getOriginData } from 'src/data/getOriginData';
import { getValue } from './inputValue';
import { localAdd } from 'src/data/localAdd';
import { getLabel } from './inputLabel';
import { qqi } from 'src/aided/qqi';
import { exitProgram } from 'src/aided/utils';
import { brightBlackPen, brightRedPen } from 'color-pen';
import { list } from 'src/list';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { dataStore } from 'src/data';
import { command } from 'src/aided/command';

/**  添加新的项  */
export async function addItem() {
  if (!qqi.available) return await exitProgram('读写受限，正在退出');
  const { pkgManager } = dataStore;
  const originData = getOriginData();
  const value = await getValue(originData);
  const label = await getLabel(originData);
  if (
    localAdd({
      value,
      label,
    })
  ) {
    _p(brightBlackPen`当前的 ${pkgManager} registry 源列表为`);
    await list();
    const tip = ['退出', '继续添加'];
    const result = await command.question({
      text: '添加完成，是否持续添加',
      tip,
    });
    if (isUndefined(result) || result === tip[0]) return await exitProgram('');
    return await addItem();
  }
  return await exitProgram(`写入${brightRedPen`失败`}，原因未知`);
}
