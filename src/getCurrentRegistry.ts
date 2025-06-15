import { runOtherCode } from 'a-node-tools';
import { dog } from './dog';
/**  获取当前配置的 本地的 registry  */
export async function getCurrentRegistry() {
  const result = await runOtherCode('npm config get registry');

  dog('获取当前的本地配置为', result);
  if (result.success) return result.data.replace(/\s/gm, '');

  return undefined;
}
