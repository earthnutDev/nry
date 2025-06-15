import { SelectionParamObjectData } from 'a-command';
import { qqi } from 'src/qqi';
import { LocalConfig } from 'src/types';

/**
 *
 */
export function localAdd(item: SelectionParamObjectData<string>) {
  // 读写受限
  if (!qqi.available) return false;

  /**  新添加项   */
  const writeItem = {
    value: item.value,
    label: item.label.toString(),
    tip: item.value,
    disable: false,
  };
  /// 本地原有数据
  const localConfig = qqi.read('config') as unknown as LocalConfig;
  /// 新添加的数据
  localConfig.push(writeItem);

  return qqi.write('config', localConfig);
}
