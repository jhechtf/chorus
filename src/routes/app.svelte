<script lang="ts">
import { BaseDirectory } from '@tauri-apps/api/path';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import Drawer from '../lib/components/drawer/drawer.svelte';
import Rail from '../lib/components/rail/rail.svelte';
import Tab from '../lib/components/tabs/tab.svelte';
import Tabs from '../lib/components/tabs/tabs.svelte';
import Titlebar from '../lib/components/titlebar/titlebar.svelte';
import { workspace } from '../lib/providers/workspace.svelte';
import { readTextFileOrCreate } from '../lib/utils/readFile';

let fileTreeOpen = $state(false);

async function init() {
  const workdir = await readTextFileOrCreate('last.txt', { baseDir: BaseDirectory.AppCache });
  if(workdir !== '') workspace.setDir(workdir.split('\n'));
}

async function updateSettingStuffData() {
  if (workspace.workspaceDirs.length === 0) return;
  await writeTextFile('last.txt', workspace.workspaceDirs.join('\n'), {
    baseDir: BaseDirectory.AppCache,
    create: true,
  });
}

$effect(() => {
  init();
});

$effect(() => {
  updateSettingStuffData();
});

</script>

<svelte:document onkeydown={(e) => {
  if(e.key === 'f') {
    fileTreeOpen = true;
  }
  if(fileTreeOpen && e.key === 'Escape') {
    fileTreeOpen = false;
  }
}}/>

<Titlebar />

<Drawer class="shadow-lg overflow-auto" bind:open={fileTreeOpen} side="left">
  <div class="p-3">
    {#each workspace.files as file}
      <p>{file}</p>
    {/each}
  </div>
</Drawer>

<div class="app-shell">
  <Rail />

  <div class="editors flex-grow flex">
    <Tabs>
      <Tab id="file-name" name="src/file/file1.ts">
        I am a bunch of text here
      </Tab>
      <Tab id="file-name-2" name="src/file/file2.ts">
        bitches ain't shit but hoes and tricks
      </Tab>
    </Tabs>
  </div>
</div>

<style>
  .app-shell {
    display: flex;
    flex-grow: 1;
  }

</style>