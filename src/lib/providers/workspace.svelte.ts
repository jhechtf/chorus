import { create, exists, mkdir, readDir } from '@tauri-apps/plugin-fs';
import { makeLoadingState } from '../hooks/loadingState.svelte';

/**
 * @description This class provides a way to interact with the workspace of the current window.
 */
class WorkspaceProvider {
  workspaceDirs: string[] = $state([]);
  files: string[] = $state([]);
  loadingState = makeLoadingState();
  queue: (() => void | Promise<void>)[] = $state([]);
  constructor() {
    this.#init();
  }
  async #init() {
    console.info(
      'Workspace Provider init, figuring out how things are going to work here',
    );
  }

  setDir(directory: string[]) {
    // Reset the workspace directories
    this.workspaceDirs = directory;
    // Reset the files
    this.files = [];
    // Load the directories
    for(const dir of directory) {
      this.#loadDir(dir);
    }
  }

  addDir(directory: string) {
    console.info('Adding directory to workspace', directory);
    this.workspaceDirs.push(directory);
    this.#loadDir(directory);
  }

  async #loadDir(dir: string) {
    const files = await readDir(dir);
    this.files.push(...files.map((f) => f.name));
  }

  // The following methods are just passing items directly through to the tauri plugin
  createFile(path: string) {
    return create(path);
  }

  createDir(path: string) {
    return mkdir(path);
  }

  exists(path: string) {
    return exists(path);
  }
}

export const workspace = new WorkspaceProvider();
