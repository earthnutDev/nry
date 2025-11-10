import { getOriginData } from 'src/data/getOriginData';
import { dog } from 'src/aided/dog';
import { getTarget } from 'src/getTarget';
import { editValue } from './editValue';
import { editLabel } from './editLabel';
import { qqi } from 'src/aided/qqi';
import { list } from 'src/list';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { exitProgram } from 'src/aided/utils';
import { command } from 'src/aided/command';

/**  编辑项  */
export async function editItem() {
  if (!qqi.available)
    return await exitProgram('当前读写权限不足，即将退出程序');

  const target = await getTarget('请选择你想要修改的项', false);

  const { value: originValue, label: originLabel } = target;

  dog('获取用户的选择', target);

  dog('原始的值', originValue);

  dog('原始的标签', originLabel);

  await editValue(target);

  await editLabel(target); // 已经写完毕
  const { value, label } = target;

  dog('更改后的值', value);

  dog('更改的标签', label);

  /// 获取本地的值，防止意外覆盖
  const originData = getOriginData();

  for (const ele of originData) {
    if (ele.value === originValue && ele.label === originLabel) {
      ele.value = value;
      ele.label = label.toString();
      break;
    }
  }

  const result = qqi.write(originData);

  /// 写入后循环问询是否循环修改
  if (result) {
    _p('更改后的列表为：');
    await list();
    const tip = ['退出', '继续修改'];
    const result = await command.question({
      text: '是否继续修改其他项',
      tip,
    });

    if (isUndefined(result) || result === tip[0]) return await exitProgram('');

    return await editItem();
  }
}
