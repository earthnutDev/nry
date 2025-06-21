import { Dog } from '@qqi/log';
import { isFalse } from 'a-type-of-js';

export const dog = new Dog({
  name: 'nry',
  type: false,
});

export const dun = isFalse(dog.type);
