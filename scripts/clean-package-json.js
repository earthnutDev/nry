import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from 'a-node-tools';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  ...packageJson,
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  files: ['bin.mjs'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/nry.git',
  },
  author: {
    name: '🥜',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  browserslist: ['node>=18.0.0'],
  engines: {
    node: '>=18.0.0',
  },
  keywords: ['nry', 'earthnut'],
  homepage: 'https://earthnut.dev/npm/nry',
  bugs: {
    url: 'https://github.com/earthnutDev/nry/issues',
    email: 'earthnut.dev@outlook.com',
  },
  bin: {
    nry: './bin.mjs',
  },
};

{
  const buildPath = getDirectoryBy('build', 'directory');

  const buildPackagePath = pathJoin(buildPath, './build/package.json');

  writeJsonFile(buildPackagePath, packageJson);
}
