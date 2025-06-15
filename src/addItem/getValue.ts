import { escapeRegExp } from 'a-js-tools';
import { isUndefined } from 'a-type-of-js';
import { greenPen, cyanPen } from 'color-pen';
import { command } from 'src/command';
import { dog } from 'src/dog';
import { LocalConfig } from 'src/types';
import { exitProgram } from 'src/utils';

/**
 *
 */
export async function getValue(originData: LocalConfig) {
  const valueVerify: { reg: RegExp; info: string; inverse?: boolean }[] = [
    {
      reg: /\s+/g,
      info: '不允许出现空格',
      inverse: true,
    },
  ];

  originData.forEach(e => {
    valueVerify.push({
      reg: new RegExp(`^${escapeRegExp(e.value)}$`, 'mg'),
      info: `${greenPen(e.value)}(${cyanPen(e.label)}) 已存在`,
      inverse: true,
    });
  });

  const value = await command.question({
    text: '请输入自定义的 npm 的源地址：',
    tip: 'https://registry.npmjs.org',
    minLen: 5,
    maxLen: 120,
    verify: valueVerify,
    required: false,
  });
  dog('用户输入的地址', value);

  if (isUndefined(value)) return await exitProgram();

  return value;
}
