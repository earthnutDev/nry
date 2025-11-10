import { escapeRegExp } from 'a-js-tools';
import { isUndefined } from 'a-type-of-js';
import { greenPen, cyanPen, reversedPen } from 'color-pen';
import { command } from 'src/aided/command';
import { dataStore } from 'src/data';
import { dog } from 'src/aided/dog';
import { LocalConfig } from 'src/types';
import { exitProgram, isCanConnect, mustEndWithSlash } from 'src/aided/utils';
import { originRegistryList } from 'src/data/origin-registry-list';
import { _p } from 'a-node-tools';

const { npm, yarn } = originRegistryList;

/**
 * 获取用户输入的数据
 */
export async function getValue(originData: LocalConfig) {
  const { pkgManager } = dataStore;
  const valueVerify: { reg: RegExp; info: string; inverse?: boolean }[] = [
    {
      reg: /\s+/g,
      info: '不允许出现空格',
      inverse: true,
    },
  ];

  originData.forEach(e => {
    valueVerify.push({
      reg: new RegExp(`^${escapeRegExp(e.value)}/*$`, 'mg'),
      info: `${greenPen(e.value)}(${cyanPen(e.label)}) 已存在`,
      inverse: true,
    });
  });

  const value = await command.question({
    text: '请输入自定义的源地址',
    tip: pkgManager === 'yarn' ? yarn : npm,
    minLen: 5,
    maxLen: 120,
    verify: valueVerify,
    required: false,
  });

  dog('用户输入的地址', value);

  if (isUndefined(value)) return await exitProgram();

  if (!(await isCanConnect(value))) {
    _p(`当前设置 registry 「${reversedPen(value)}」 不可用`);
    _p(`请使用正确的源设置`);

    return await getValue(originData);
  }

  return mustEndWithSlash(value);
}
