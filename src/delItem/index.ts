import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { command } from 'src/command';
import { getOriginData } from 'src/data/getOriginData';
import { getTarget } from 'src/getTarget';
import { list } from 'src/list';
import { qqi } from 'src/qqi';
import { exitProgram } from 'src/utils';

/**
 * 移除项
 */
export async function delItem() {
  if (!qqi.available) return await exitProgram('当前读写受限，即将退出程序');

  const target = await getTarget('请选择要删除的项', false, false);

  const { value, label } = target;

  /// 获取本地的值，防止意外覆盖
  const originData = getOriginData();

  for (const i in originData) {
    const index = Number(i);

    const ele = originData[index];

    if (ele.value === value && ele.label === label) {
      originData.splice(index, 1);
      break;
    }
  }

  const result = qqi.write('config', originData);

  if (result) {
    _p('删除项后的列表为：');
    await list();
    const tip = ['退出', '继续删除'];
    const result = await command.question({
      text: '是否继续删除其他项',
      tip,
    });

    if (isUndefined(result) || result === tip[0]) return await exitProgram('');

    return await delItem();
  }
}
