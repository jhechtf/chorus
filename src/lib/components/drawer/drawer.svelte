<script lang="ts">
import type { Snippet } from 'svelte';
interface DrawerState {
  open: boolean;
  close: () => void;
}

interface DrawerProps {
  children: Snippet<[DrawerState, unknown]>;
  open: boolean;
  onclose: () => void;
}

let {
  children,
  open = $bindable(false),
  onclose = () => void 0,
  ...restProps
}: DrawerProps = $props();

$effect(() => {
  if (open === false) {
    onclose();
  }
});
</script>

<div class="drawer">
  {@render children({
    open,
    close: () => {
      open = false;
    }
  }, restProps)}
</div>

<style>
  .drawer {
    background-color: theme('backgroundColor.zinc.800/40');
    position: fixed; 
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>