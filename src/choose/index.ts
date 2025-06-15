import { getTarget } from 'src/getTarget';
import { setNewRegistry } from './setNewRegistry';

/**  挑选一个域  */
export async function choose() {
  /**  获取靶  */
  const target = await getTarget();

  await setNewRegistry(target);
}
