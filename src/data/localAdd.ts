import { SelectionParamObjectData } from 'a-command';
import { qqi } from 'src/aided/qqi';
import { mustEndWithSlash } from 'src/aided/utils';

/**
 *
 */
export function localAdd(item: SelectionParamObjectData<string>) {
  // 读写受限
  if (!qqi.available) return false;

  const value = mustEndWithSlash(item.value);

  return qqi.addNew({
    value,
    label: item.label.toString(),
    tip: value,
    disable: false,
  });
}
