import { SelectionParamObjectData } from 'a-command';
import { _p, runOtherCode } from 'a-node-tools';
import { bluePen, greenPen } from 'color-pen';
import { dataStore } from 'src/data';
import { exitProgram } from 'src/aided/utils';

/**  设置新的  */
export async function setNewRegistry(item: SelectionParamObjectData<string>) {
  const { pkgManager } = dataStore;
  const result = await runOtherCode(
    `${pkgManager} config set registry ${item.value}`,
  );

  if (!result.success) await exitProgram();

  _p(
    `已将 ${pkgManager} registry 更改为 ${greenPen(item.value)}(${bluePen(item.label)})`,
  );
}
