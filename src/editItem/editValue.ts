import { SelectionParamObjectData } from 'a-command';
import { isUndefined } from 'a-type-of-js';
import { command } from 'src/command';
import { dog } from 'src/dog';

/**  更改值  */
export async function editValue(target: SelectionParamObjectData<string>) {
  const result = await command.question({
    text: '请更改为新的 npm registry 值',
    tip: target.value,
    defaultValue: target.value,
    required: false,
  });
  dog('新值为', result);
  /**  没有更改  */
  if (isUndefined(result)) return;
  target.value = target.tip = result;
}
