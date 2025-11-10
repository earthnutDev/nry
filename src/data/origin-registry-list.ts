/**
 *
 * 支持的默认的可选的
 */
export type OriginRegistryItem =
  | 'npm'
  | 'tao-bao'
  | 'ten-xun'
  | 'ustclug'
  | 'yarn';

/** 导出默认的组 */
export const originRegistryList: {
  [x in OriginRegistryItem]: string;
} = {
  npm: 'https://registry.npmjs.org/',
  'tao-bao': 'https://registry.npmmirror.com/',
  'ten-xun': 'https://mirrors.tencent.com/npm/',
  ustclug: 'https://npmreg.proxy.ustclug.org/',
  yarn: 'https://registry.yarnpkg.com/',
};
