import { SelectionParamObjectData } from 'a-command';
import { qqi } from 'src/aided/qqi';

/**
 *
 */
export function localAdd(item: SelectionParamObjectData<string>) {
  // 读写受限
  if (!qqi.available) return false;

  return qqi.addNew({
    value: item.value,
    label: item.label.toString(),
    tip: item.value,
    disable: false,
  });
}
