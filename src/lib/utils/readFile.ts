import { readTextFile, create, type ReadFileOptions } from '@tauri-apps/plugin-fs'

export async function readTextFileOrCreate(path: string, opts?: ReadFileOptions) {
  try {
    return readTextFile(path, opts);
  } catch(e) {
    if(typeof e === 'string' && e.endsWith('os error 2)')) {
      await create(path, opts);
      return '';
    }
    throw e;
  }
}