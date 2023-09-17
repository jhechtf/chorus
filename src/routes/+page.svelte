<script lang="ts">
  import { onMount } from 'svelte';
  import { workspaceDir } from '$lib/stores/current';
  import { readDir, type FileEntry } from '@tauri-apps/api/fs';
  import { sep, basename } from '@tauri-apps/api/path';
  import { Folder } from 'lucide-svelte';
    import Monaco from '$lib/components/monaco.svelte';

  let items: FileEntry[] = [];

  onMount(async () => {
    const f = await readDir(`${$workspaceDir}projects${sep}typehero`, { recursive: true });
    items = f.toSorted((a, b) => a.children && a.children.length ? -1 : a.path < b.path ? -1 : 1);
  });
</script>
<div class="relative flex h-screen">
  <aside class="p-2 overflow-auto">
    Sidebar
    {#await basename($workspaceDir) }
      Loading...
    {:then bob} 
      {bob}
    {/await}
    {#each items as item}
      <p class="flex gap-2">
        {#if item && item.children && item?.children?.length > 0}
          <Folder />
        {/if}
        {item.name}
      </p>
    {/each}
  </aside>
  <section class="bg-zinc-900 flex-grow flex flex-col">
    <main class="flex-grow">
      <header class="p-3">
        Tabs Bar?
      </header>
      <Monaco value="let v: string = 'bob';" filepath="file:///something.ts" />
    </main>
    <footer class="p-4 bg-zinc-900">
      Terminal here
    </footer>
  </section>
  <section class="p-3">
    other section
  </section>
  <!-- <div class="absolute flex flex-col top-10 left-10 right-10 bottom-10 bg-zinc-800 rounded shadow shadow-zinc-200 p-4">
    <header class="p-2">
      close button
    </header>
    <div class="search w-1/2">
      <input class="border rounded p-2 border-zinc-50" placeholder="hi" type="text">
    </div>
  </div> -->
</div>