<script lang="ts">
import { BaseDirectory } from '@tauri-apps/api/path';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import Rail from '../lib/components/rail/rail.svelte';
import Tab from '../lib/components/tabs/tab.svelte';
import Tabs from '../lib/components/tabs/tabs.svelte';
import Titlebar from '../lib/components/titlebar/titlebar.svelte';
import { workspace } from '../lib/providers/workspace.svelte';
import { readTextFileOrCreate } from '../lib/utils/readFile';
import Monaco from '../lib/components/monaco.svelte';
import Footer from '$lib/components/footer/footer.svelte';
import Codemirror from '$lib/components/codemirror.svelte';
import { keybindings } from '$src/lib/providers/keybindings.svelte';

async function init() {
  const workdir = await readTextFileOrCreate('last.txt', {
    baseDir: BaseDirectory.AppCache,
  });
  if (workdir !== '') workspace.setDir(workdir.split('\n'));
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

<svelte:document onkeydown={keybindings.normalModeListener} />

<Titlebar />
<div class="app-shell">
  <div class="top flex flex-grow">
    <!-- Rail -->
    <Rail />

    <!-- The editors group -->
    <div class="editors flex-grow flex h-full">
      <div class="group vertical w-[30%] h-full">
        <Tabs>
          <Tab id="file-name" name="src/file/something-else.ts">
            <Codemirror doc=""/>
          </Tab>
          <Tab id="file-name-2" name="src/file/something.ts">
            <Monaco value="let v: string = 'bob';" filepath="file:///something.ts" />
          </Tab>
        </Tabs>
      </div>
      <div class="group vertical w-[70%] border-l">
        <div class="flex flex-col h-[50%]">
          <Tabs>
            <Tab id="file-name" name="src/file/something-else.ts">
              <Codemirror doc=""/>
            </Tab>
          </Tabs>
        </div>

        <div class="group horizontal h-[50%]">
          <Tabs>
          <Tab id="file-name" name="src/file/something-else.ts">
            <Codemirror doc="console.info('horizontal tab');"/>
          </Tab>
        </Tabs>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</div>

<style>
  .app-shell {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
</style>