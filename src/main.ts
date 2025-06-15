import { addItem } from './addItem';
import { choose } from './choose';
import { commandParameters } from './data/commandParameters';
import { delItem } from './delItem';
import { dog } from './dog';
import { editItem } from './editItem';
import { list } from './list';
import { manageVisible } from './manageVisible';
import { parseArg } from './parse';
import { reset } from './reset';

/**  主程序  */
export async function main() {
  parseArg();

  dog('执行');
  if (commandParameters.noMatch) {
    dog('当前没有匹配值');
    return await choose();
  } else if (commandParameters.reset) {
    dog('重置项');
    return await reset();
  } else if (commandParameters.list) {
    dog('当前为展示项');
    return await list();
  } else if (commandParameters.manage) {
    dog('当前执行状态更改');
    return await manageVisible();
  } else if (commandParameters.add) {
    dog('添加新的项');
    return await addItem();
  } else if (commandParameters.edit) {
    dog('编辑项');
    return await editItem();
  } else if (commandParameters.delete) {
    dog('删除项');
    return await delItem();
  }
}
