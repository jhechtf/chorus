import { createRawSnippet, type Component} from 'svelte';

export type ModalRegistryObject = {
  name: string;
  component: Component;
  cleanup?: () => void;
}

class ModalRegistry {
  registry = $state<ModalRegistryObject[]>([]);
  registryMap = $derived.by(() => {
    return this.registry.reduce((acc, cur) => {
      if(acc.has(cur.name)) {
        throw new Error(`Duplicate modal name: ${cur.name}`);
      }
      acc.set(cur.name, cur);
      return acc;
    },
    new Map<string, ModalRegistryObject>())
  });

  active = $state<ModalRegistryObject | null>(null);

  registerComponent(opts: ModalRegistryObject) {
    if(this.registryMap.has(opts.name)) {
      throw new Error(`Duplicate modal name: ${opts.name}`);
    }
    this.registry.push(opts);
  }

  activate(name: string){
    if(this.registryMap.has(name) && this.active === null) {
      this.active = this.registryMap.get(name) as ModalRegistryObject;
    }
  }

  deactivate(name?: string) {
    if(this.active && name === this.active.name) {
      this.active = null;
    }
    else if(!name) {
      this.active = null;
    }
  }
}

const registry = new ModalRegistry();

export {
  registry
};

