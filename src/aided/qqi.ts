import { isArray } from 'a-type-of-js';
import { QQI } from 'qqi';
import { getOriginData } from 'src/data/getOriginData';
import { LocalConfig, LocalConfigItem } from 'src/types';
import { dog } from './dog';
import { unlinkSync } from 'node:fs';

/**  构建读写机  */
const _qqi = new QQI('nry');

const filename = 'config';

export const qqi = {
  /**  当前是否可用  */
  available: _qqi.available,
  /**  公共读数据
   *
   * 如果数据不支持则返回默认值
   */
  read(): LocalConfig {
    if (_qqi.available) {
      const localData = _qqi.read(filename) as unknown as LocalConfig;
      // 简单判断当前数据是否有值
      if (isArray(localData)) {
        return localData;
      }
    }
    return getOriginData(true);
  },
  /**  添加新的项  */
  addNew(newItem: LocalConfigItem) {
    if (_qqi.available) {
      /**  当前的旧数据  */
      const localData = this.read();
      // 添加新的项
      localData.push(newItem);
      dog('新写入的数据为', newItem);
      // 写入新的数据
      return this.write(localData);
    }
    return false;
  },
  /**  公共写数据  */
  write(data: LocalConfig) {
    if (_qqi.available) {
      return _qqi.write(filename, data);
    }
    return false;
  },
  /**  获取当前的数据  */
  getPath(): string {
    return _qqi.getPath(filename);
  },
  /**  清理文件，该项仅出现在非标记的开发环境  */
  clean() {
    const filename = this.getPath();
    dog('将要移除的文件', filename);
    unlinkSync(filename);
  },
};
