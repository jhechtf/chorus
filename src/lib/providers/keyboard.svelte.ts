import { BaseDirectory, homeDir, resolve } from '@tauri-apps/api/path';
import { makeLoadingState } from '../hooks/loadingState.svelte';
import { readTextFileOrCreate } from '../utils/readFile';
import { parse } from '@std/toml';

class KeyboardProvider {
  settingsDir: string = $state('');
  loadingState = makeLoadingState();

  constructor() {
    this.#init();
  }

  async #init() {
    this.loadingState.load(async () => {
      const dir = await resolve(await homeDir(), '.chorus/');
      const keyboardShortcutsRaw = await readTextFileOrCreate('.chorus/keyboard.toml', { baseDir: BaseDirectory.Home})
      const d = parse(keyboardShortcutsRaw);
    });
  }
}

export const keyboardShortcuts = new KeyboardProvider();

