import { detectPackageManager } from 'src/utils';
import { DataStore } from '../types';
import { commandParameters } from './commandParameters';

export const dataStore: DataStore = {
  commandParameters,
  pkgManager: detectPackageManager(),
};
