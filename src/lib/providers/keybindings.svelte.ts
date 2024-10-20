import { BaseDirectory, homeDir, resolve } from '@tauri-apps/api/path';
import { makeLoadingState } from '../hooks/loadingState.svelte';
import { readTextFileOrCreate } from '../utils/readFile';
import { parse } from '@std/toml';

export type KeyboardCombination = {
  combination: string[];
  command: string;
};

export type KeyboardCommand = {
  command: string;
  key: string;
};

export type KeyboardShortcut = KeyboardCommand | KeyboardCombination;

export type KeyboardShortcuts = KeyboardShortcut[];

class KeyboardProvider {
  settingsDir: string = $state('');
  loadingState = makeLoadingState();
  shortcuts: KeyboardShortcuts = $state([]);
  shortcutsMap = $derived(this.shortcuts);

  constructor() {
    this.#init();
  }

  async #init() {
    this.loadingState.load(async () => {
      const dir = await resolve(await homeDir(), '.chorus/');
      const keyboardShortcutsRaw = await readTextFileOrCreate(await resolve(dir, 'keybindings.toml'), { baseDir: BaseDirectory.Home})
      const d = parse(keyboardShortcutsRaw);
      console.info(d);
    });
  }
}

export const keyboardShortcuts = new KeyboardProvider();
