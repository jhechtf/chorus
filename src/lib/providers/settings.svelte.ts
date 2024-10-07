
class SettingsProvider {
  settings = $state<Record<string, any>>({});
  constructor() {
    this.#init();
  }
  async #init() {
    // We're going to have to do the settings merge that VSCode does,
    // but for now, just return an empty object
    return {};
  }
}

export const settingsProvider = new SettingsProvider();
