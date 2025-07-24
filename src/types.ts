export type PkgManager = 'npm' | 'yarn' | 'pnpm';

/**  本地数据  */
export type LocalConfig = {
  /**  本地项值  */
  value: string;
  /**  本地项展示的别名  */
  label: string;
  /**  展示的值  */
  tip: string;
  /**  是否显示  */
  disable?: boolean;
}[];

/**  命令参数  */
export type CommandParameters = {
  /**  没有匹配到数据 */
  noMatch: boolean;
  /**  添加新的项  */
  add: boolean;
  /**  编辑项  */
  edit: boolean;
  /**  删除项  */
  delete: boolean;
  /**  理出当前可用项  */
  list: boolean;
  /**  控制项的显隐  */
  manage: boolean;
  /**  重制项  */
  reset: boolean;
};

/**  数据  */
export type DataStore = {
  /**  命令参数  */
  commandParameters: CommandParameters;
  /**  使用包管理器  */
  pkgManager: PkgManager;
};
