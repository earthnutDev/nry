import { SelectionParamObjectData } from 'a-command';
import { _p, runOtherCode } from 'a-node-tools';
import { bluePen, greenPen } from 'color-pen';
import { exitProgram } from 'src/utils';

/**  设置新的  */
export async function setNewRegistry(item: SelectionParamObjectData<string>) {
  const result = await runOtherCode(`npm config set registry ${item.value}`);

  if (!result.success) await exitProgram();

  _p(
    `已将 npm registry 更改为 ${greenPen(item.value)}(${bluePen(item.label)})`,
  );
}
