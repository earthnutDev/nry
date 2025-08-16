import { escapeRegExp } from 'a-js-tools';
import { isUndefined } from 'a-type-of-js';
import { greenPen, cyanPen } from 'color-pen';
import { command } from 'src/aided/command';
import { dataStore } from 'src/data';
import { dog } from 'src/aided/dog';
import { LocalConfig } from 'src/types';
import { exitProgram } from 'src/aided/utils';
/**  获取 label  */
export async function getLabel(originData: LocalConfig) {
  const valueVerify: { reg: RegExp; info: string; inverse?: boolean }[] = [
    {
      reg: /\s+/g,
      info: '不允许出现空格',
      inverse: true,
    },
  ];

  const { pkgManager } = dataStore;

  originData.forEach(e => {
    valueVerify.push({
      reg: new RegExp(`^${escapeRegExp(e.label)}$`, 'mg'),
      info: `${greenPen(e.label)}(${cyanPen(e.value)}) 已存在`,
      inverse: true,
    });
  });

  const value = await command.question({
    text: `请输入自定义的 ${pkgManager} 的别名`,
    tip: '任意别名',
    minLen: 1,
    maxLen: 120,
    verify: valueVerify,
    defaultValue: '',
    required: false,
  });
  dog('用户输入的别名为', value);

  if (isUndefined(value)) return await exitProgram();

  return value;
}
