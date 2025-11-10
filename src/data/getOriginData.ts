import { isArray, isBusinessEmptyString, isString } from 'a-type-of-js';
import { qqi } from 'src/aided/qqi';
import { LocalConfig } from 'src/types';
import { originRegistryList } from './origin-registry-list';
import { mustEndWithSlash } from 'src/aided/utils';

const {
  npm,
  'tao-bao': taoBao,
  'ten-xun': tenXun,
  ustclug,
  yarn,
} = originRegistryList;

const originData = [
  {
    value: npm,
    label: '官方',
    tip: npm,
  },
  {
    value: taoBao,
    label: '淘宝',
    tip: taoBao,
  },
  {
    value: tenXun,
    label: '腾讯',
    tip: tenXun,
  },
  {
    value: ustclug,
    label: '中科大',
    tip: ustclug,
  },
  {
    value: yarn,
    label: 'yarn',
    tip: yarn,
  },
];
/**
 * 创建原始的数据
 *
 * @param [reset=false]  是否为重置，该情况下直接返回原始值进行覆盖
 */
export function getOriginData(reset: boolean = false): LocalConfig {
  // 重置默认返回原始值
  if (reset) return [...originData];
  // 读写受限返回原始值
  if (!qqi.available) return [...originData];

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
    // 强制带杠
    const result = localConfig.map(e => {
      e.value = mustEndWithSlash(e.value);
      e.tip = mustEndWithSlash(e.tip);
      return e;
    });

    return result;
  }

  // 默认返回原始值
  return [...originData];
}
