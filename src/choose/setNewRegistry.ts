import { SelectionParamObjectData } from 'a-command';
import { _p, runOtherCode } from 'a-node-tools';
import { bluePen, greenPen, magentaPen } from 'color-pen';
import { dataStore } from 'src/data';
import { exitProgram, isCanConnect, mustEndWithSlash } from 'src/aided/utils';
import { dog } from 'src/aided/dog';

/**  设置新的  */
export async function setNewRegistry(item: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;

  const registry = mustEndWithSlash(item.value);

  if (!(await isCanConnect(registry)))
    return await exitProgram(
      `选择的项 「${magentaPen(registry)}」 不可连接，无法被设置`,
    );

  const code = `${pkgManager} config set registry "${registry}"`;

  dog('设置源执行代码', code);

  const result = await runOtherCode(code);

  if (!result.success) await exitProgram();

  _p(
    `已将 ${pkgManager} registry 更改为 ${greenPen(item.value)}(${bluePen(item.label)})`,
  );
}
