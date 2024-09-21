<script lang="ts">
  import Monaco from '$lib/components/monaco.svelte';
  import { workspaceDir } from '$lib/stores/current';
  import { readDir, type FileEntry } from '@tauri-apps/api/fs';
  import { basename, sep } from '@tauri-apps/api/path';
  import { Folder } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let items: FileEntry[] = $state([]);

  onMount(async () => {
    const f = await readDir(`${$workspaceDir}projects${sep}typehero`, { recursive: true });
    items = f.toSorted((a, b) => a.children && a.children.length ? -1 : a.path < b.path ? -1 : 1);
  });

  let focused : FileEntry | null=  $state(null);
  let content: string | null = $state(null);

</script>
<div class="relative flex h-screen">
  <aside class="p-2 overflow-auto">
    {#await basename($workspaceDir) }
      Loading...
    {:then currentWorkspace} 
      <p>
        {currentWorkspace}
      </p>
    {/await}
    {#each items as item}
      <p class="flex gap-2">
        <a href="/" onclick={(e) => {
          e.preventDefault();
          active = item;
        }}
        role="menuitem"
        onkeydown={e => e.key === 'Enter' && e.currentTarget.click()}
        tabindex="0">

          {#if item && item.children && item?.children?.length > 0}
            <Folder />
          {/if}
          {item.name}
        </a>
      </p>
    {/each}
  </aside>
  <section class="bg-zinc-900 flex-grow flex flex-col">
    <main class="flex-grow">
      <header class="p-3">
        Tabs Bar?
      </header>
      <Monaco value={content} filepath="file:///something.ts" />
    </main>
    <footer class="p-4 bg-zinc-900">
      Terminal here
    </footer>
  </section>
  <section class="p-3">
    other section
  </section>
</div>