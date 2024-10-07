<script lang="ts">
import { setContext, type Snippet } from 'svelte';
import type { Tab, TabContext } from './types';

let { children }: { children: Snippet<[]> } = $props();
let tabs: Record<string, Tab> = $state({});
let active: Tab | null = $state(null);

setContext<TabContext>('tabs', {
  registerTab: (id: string, name: string, content: Snippet<[]>) => {
    if (tabs[id]) {
      throw new Error(`Tab with id ${id} already exists`);
    }
    tabs[id] = {
      id,
      name,
      content,
    };
    // if there is no active tab, set the first one.
    if (active === null) {
      active = tabs[id];
    }
    return () => {
      delete tabs[id];
    };
  },
  get active() {
    return active;
  },
});
</script>

<div class="tabs flex flex-col">
  <header class="flex">
    {#each Object.entries(tabs) as [id, tab]}
      <button class="p-2" class:bg-zinc-800={tab === active} class:rounded-t-md={tab === active} onclick={() => active = tab}>  
        {tab.name}
      </button>
    {/each}
  </header>
  <section class="bg-zinc-800">
    {@render children()}
  </section>
</div>
