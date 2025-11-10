import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';
import terser from '@rollup/plugin-terser';
import process from 'node:process';

const dev = process.env.dev === 'true';

export default {
  input: './bin.ts',
  output: {
    format: 'es',
    entryFileNames: '[name].mjs',
    preserveModules: dev,
    sourcemap: false,
    exports: 'named',
    dir: 'dist/',
  },
  // 配置需要排除或包含的包
  external: external({
    include: [
      'src/aided/dog',
      'src/data/getOriginData',
      'src/aided/qqi',
      'src/aided/utils',
      'src/data/localAdd',
      'src/getTarget',
      'src/getCurrentRegistry',
      'src/list',
      'src/data',
      'src/aided/command',
      'src/data/origin-registry-list',
    ],
    ignore: ['node:fs', 'node:https'],
  }),
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript(),
    cleanup(),
    !dev && terser(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
