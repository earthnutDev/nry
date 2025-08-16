import { SelectionParamObjectData } from 'a-command';
import { isUndefined } from 'a-type-of-js';
import { command } from 'src/aided/command';
import { dataStore } from 'src/data';
import { dog } from 'src/aided/dog';

/**  更改值  */
export async function editValue(target: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;
  const result = await command.question({
    text: `请更改为新的 ${pkgManager} registry 值`,
    tip: target.value,
    defaultValue: target.value,
    required: false,
  });
  dog('新值为', result);
  /**  没有更改  */
  if (isUndefined(result)) return;
  target.value = target.tip = result;
}
