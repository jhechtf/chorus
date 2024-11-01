// Not 100% how we're going to do this, but I'm thinking we'll have a command registry

import type { MaybePromiseFn } from '../hooks/loadingState.svelte';

class CommandRegistry {
  registry = $state<Record<string, Command>>({});
  constructor() {
    this.#init();
  }

  async #init() {}

  registerCommand(key: string, command: Command) {
    this.registry[key] = command;
    return this;
  }
}

export interface Command {
  name: string;
  description?: string;
  handler: MaybePromiseFn<void>;
}

export const commands = new CommandRegistry();

commands.registerCommand('chorus.open-file-explorer-sideview', {
  name: 'Open File explorer sideview (float)',
  description: 'Opens the file explorer sideview (floating)',
  handler: () => {
    console.info('Open says-a-me');
  },
});
