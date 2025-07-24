import { SelectionParamObjectData } from 'a-command';
import { isUndefined } from 'a-type-of-js';
import { command } from 'src/command';
import { dataStore } from 'src/data';
import { dog } from 'src/dog';

/**  更改当前的 label 值  */
export async function editLabel(target: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;
  const result = await command.question({
    text: `请更改为新的 ${pkgManager} registry 别名`,
    tip: target.label,
    defaultValue: target.label.toString(),
    required: false,
  });
  dog('新值为', result);
  /**  没有更改  */
  if (isUndefined(result)) return;
  target.label = result;
}
