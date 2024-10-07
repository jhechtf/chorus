<script lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window';
import {
  AppWindowIcon,
  MinimizeIcon,
  XIcon,
  MaximizeIcon,
} from 'lucide-svelte';
import Menu from './menu.svelte';
import Search from './search.svelte';
const currentWindow = getCurrentWindow();
let isMaximized = $state(false);

currentWindow.onResized(async () => {
  isMaximized = await currentWindow.isMaximized();
});
</script>

<div data-tauri-drag-region class="flex justify-between p-2 sticky top-0 box-border bg-zinc-900">
  <Menu />

  <Search />

  <div class="actions" tabindex="-1">
    <button onclick={() => currentWindow.minimize()}>
      <MinimizeIcon />
    </button>
    <button onclick={() => isMaximized ? currentWindow.unmaximize(): currentWindow.maximize()}>
      {#if isMaximized}
        <AppWindowIcon />
      {:else}
        <MaximizeIcon />
      {/if}
    </button>
    <button onclick={() => currentWindow.close()}>
      <XIcon />
    </button>
  </div>
</div>