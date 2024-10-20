import { readDir, type DirEntry } from '@tauri-apps/plugin-fs';
import { makeLoadingState } from '../hooks/loadingState.svelte';

export type FileEntryOpts = {
  eagerLoad?: boolean;
  directory?: string;
}

export class FileEntry {
  // Set the children to an empty array by default
  #children: FileEntry[] = $state([]);

  loadingState = makeLoadingState();

  constructor(private dirEntry: DirEntry, eagerLoad: FileEntryOpts = { eagerLoad: false, directory: '' }) {

  }

  get children() {
    if(!this.loadingState.loading && this.loadingState.data === null) {
      // Load the data;
      this.loadingState.load(async () => {
        const c = await readDir(this.dirEntry.name);
      });
    }
    return this.#children;
  }
}
