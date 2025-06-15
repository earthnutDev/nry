import { brightBlackPen, greenPen, magentaPen } from 'color-pen';
import { getOriginData } from './data/getOriginData';
import { Table } from 'colored-table';
import { _p } from 'a-node-tools';
import { getCurrentRegistry } from './getCurrentRegistry';

/**  展示项  */
export async function list() {
  /**  当前数据  */
  const data = getOriginData();
  const current = await getCurrentRegistry();

  const table = new Table();

  table.setHeader(['npm registry', '别名', '当前可见']);

  data.forEach(e =>
    table.addRow([
      (current === e.value ? magentaPen`* ` : '  ').concat(e.value),
      (current === e.value ? magentaPen`* ` : '  ').concat(greenPen(e.label)),
      e.disable ? '❌' : '✅',
    ]),
  );

  table(); // 渲染
  _p(brightBlackPen`注：当前可见状态仅影响 npx nry 选择项`);
}
