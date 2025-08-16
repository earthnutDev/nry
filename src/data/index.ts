import { detectPackageManager } from 'a-node-tools';
import { DataStore } from '../types';
import { commandParameters } from './commandParameters';

export const dataStore: DataStore = {
  commandParameters,
  /// 仅使用启动环境值更改
  pkgManager: detectPackageManager(true),
};
