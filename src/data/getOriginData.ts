import { isArray, isBusinessEmptyString, isString } from 'a-type-of-js';
import { qqi } from 'src/aided/qqi';
import { LocalConfig } from 'src/types';

/**
 * 创建原始的数据
 *
 * @param [reset=false]  是否为重置，该情况下直接返回原始值进行覆盖
 */
export function getOriginData(reset: boolean = false): LocalConfig {
  const originData = [
    {
      value: 'https://registry.npmjs.org',
      label: '官方',
      tip: 'https://registry.npmjs.org',
    },
    {
      value: 'https://registry.npmmirror.com',
      label: '淘宝',
      tip: 'https://registry.npmmirror.com',
    },
    {
      value: 'https://mirrors.tencent.com/npm',
      label: '腾讯',
      tip: 'https://mirrors.tencent.com/npm',
    },
    {
      value: 'https://npmreg.proxy.ustclug.org',
      label: '中科大',
      tip: 'https://npmreg.proxy.ustclug.org',
    },
    {
      value: 'https://registry.yarnpkg.com',
      label: 'yarn',
      tip: 'https://registry.yarnpkg.com',
    },
  ];

  // 重置默认返回原始值
  if (reset) return originData;
  // 读写受限返回原始值
  if (!qqi.available) return originData;

  const localConfig = qqi.read();

  if (
    isArray(localConfig) &&
    localConfig.every(
      e =>
        isString(e.value) &&
        !isBusinessEmptyString(e.label) &&
        isString(e.value) &&
        !isBusinessEmptyString(e.value),
    )
  ) {
    return localConfig;
  }

  // 默认返回原始值
  return originData;
}
