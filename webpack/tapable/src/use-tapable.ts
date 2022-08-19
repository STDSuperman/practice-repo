import { SyncHook } from 'tapable';
import { SyncHook as SimpleSyncHook } from './simple-tapable';

// const instance = new SyncHook(['mxl']);
const instance = new SimpleSyncHook(['mxl']);

instance.tap('func1', (...args: any) => {
  console.log('func1', ...args);
})

instance.tap('func2', (...args: any) => {
  console.log('func2', ...args);
})

instance.call('first call');