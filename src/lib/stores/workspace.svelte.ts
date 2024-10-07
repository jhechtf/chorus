import { join, homeDir } from '@tauri-apps/api/path';
import { readDir, type DirEntry } from '@tauri-apps/plugin-fs';
import { open } from '@tauri-apps/plugin-dialog';

class Workspace {
  homeDir = $state<string>('');
  workspaceDir = $state<string[]>(['']);
  workspaceFiles = $state<DirEntry[]>([]);

  constructor() {
    this.#init();
  }

  async #init() {
    this.homeDir = await homeDir();
  }
  /**
   *
   * @param dir Loads a directory in the workspace directory
   */
  async loadDirectory(dir: string) {
    if (this.workspaceDir.length === 1 && this.workspaceDir[0] === '') {
      return [];
    }

    try {
      return await readDir(await join(this.homeDir, 'projects', 'chorus'));
    } catch (e) {
      console.error(e);
    }
  }

  async chooseDirectory() {
    try {
      const dir = await open({
        directory: true,
        title: 'Select a directory',
        canCreateDirectories: true,
        recursive: true,
        defaultPath: this.homeDir || undefined,
      });
      console.info('DIR', dir);
    } catch (e) {
      console.error(e);
    }
  }
}

export const workspaceProvider = new Workspace();
