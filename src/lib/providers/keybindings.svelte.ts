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
  shortcutsMap = $derived(this.shortcuts.reduce((all, cur) => {
    if(cur.key !== undefined) 
      all.insert.push(cur);
    else all.normal.push(cur)
    return all;
  }, { normal: [], insert: []} as Record<'normal' | 'insert', KeyboardShortcut[]>));

  constructor() {
    this.#init();
  }

  async #init() {
    this.loadingState.load(async () => {
      const dir = await resolve(await homeDir(), '.chorus/');
      const keyboardShortcutsRaw = await readTextFileOrCreate('.chorus/keybindings.toml', { baseDir: BaseDirectory.Home})
      const d = parse(keyboardShortcutsRaw);
      console.info(d);
      this.shortcuts = d.bindings;
    });
  }

  addShortcut(shortcut: KeyboardShortcut) {

  }
}

export const keyboardShortcuts = new KeyboardProvider();
