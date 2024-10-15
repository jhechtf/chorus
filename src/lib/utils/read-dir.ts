import type { ReadDirOptions as TauriReadDirOptions } from '@tauri-apps/plugin-fs';
import { readDir as tauriReadDir } from '@tauri-apps/plugin-fs';
import { FileEntry, type FileEntryOpts } from '../classes/file.svelte';
import { resolve,  } from '@tauri-apps/api/path';

export type ReadDirOptions = TauriReadDirOptions & Omit<FileEntryOpts, 'directory'> ;

export async function readDir(dir: string, options?: ReadDirOptions): Promise<FileEntry[]> {
  const items = await tauriReadDir(dir, options);
  const filesMap = items.map(item => {
    return new FileEntry(item, { directory: dir, eagerLoad: options?.eagerLoad})
  });
  return filesMap;
}
