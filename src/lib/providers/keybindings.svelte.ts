import { BaseDirectory, homeDir, resolve } from '@tauri-apps/api/path';
import { makeLoadingState } from '../hooks/loadingState.svelte';
import { readTextFileOrCreate } from '../utils/readFile';
import { parse } from '@std/toml';
import { Command } from '../commands/index.svelte';

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

export type Mode = 'normal' | 'insert';

class KeybindingsProvider {
  loadingState = makeLoadingState();
  settingsDir: string = $state('');
  shortcuts: KeyboardShortcuts = $state([
    {
      command: 'chorus.open-file-explorer-sideview',
      combination: ['<leader>', 'f', 'f'],
    },
  ]);
  shortcutsMap = $derived(this.shortcuts);
  mode: Mode = $state('normal');
  buffer: string[] = $state([]);
  #clearBuffer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.#init();
  }

  async #init() {
    this.loadingState.load(async () => {
      const dir = await resolve(await homeDir(), '.chorus/');
      const keyboardShortcutsRaw = await readTextFileOrCreate(
        await resolve(dir, 'keybindings.toml'),
        { baseDir: BaseDirectory.Home },
      );
      const parsedShortcuts = parse(keyboardShortcutsRaw) as Record<
        'bindings',
        KeyboardShortcuts[]
      >;
      console.info(parsedShortcuts);
    });
  }

  // This needs to be an arrow function otherwise the `this` gets overwritten
  normalModeListener = (e: KeyboardEvent) => {
    if (this.mode === 'normal') {
      // Clear the timeout if there is one.
      if (this.#clearBuffer) clearTimeout(this.#clearBuffer);
      // Add the current key combo to the buffer
      this.buffer.push(e.key === ' ' ? '<leader>' : e.key);

      // Set the timeout to clear the buffer and reset it to null
      this.#clearBuffer = setTimeout(() => {
        this.buffer = [];
        this.#clearBuffer = null;
      }, 210);
      // TODO: The wait time should be configurable by the end user
    }
  };

  lookupShortcut(keybinding: KeyboardShortcut): Command | null {
    console.info('Looking up shortcut:', keybinding);
    return null;
  }
}

export const keybindings = new KeybindingsProvider();
