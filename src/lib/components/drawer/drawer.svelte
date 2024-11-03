<script lang="ts">
import type { Snippet } from 'svelte';
interface DrawerState {
  open: boolean;
  close: () => void;
}

interface DrawerProps {
  children: Snippet<[DrawerState, unknown]>;
  open: boolean;
  onclose?: () => void;
  class?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

let {
  children,
  open = $bindable(false),
  onclose = () => void 0,
  side = 'left',
  class: className = '',
  ...restProps
}: DrawerProps = $props();

$effect(() => {
  if (open === false) {
    onclose();
  }
});
</script>

<div class={`drawer ${className} ${side}`} class:open={open}>
  {@render children({
    open,
    close: () => {
      open = false;
    }
  }, restProps)}
</div>

<style>
  .drawer {
    display: none;
    background-color: theme('backgroundColor.zinc.800/40');
    position: fixed; 
    transition: translate 300ms ease-in;
    &.open {
      display: block;
    }

    &.open.left {
      border-radius: 0 theme('borderRadius.md') theme('borderRadius.md') 0;
      translate: 0 0;
      top: 35px;
      left: 0;
      bottom: 0;
    }
    &.open.right {
      border-radius: theme('borderRadius.md') 0 0 theme('borderRadius.md');
      translate: 0 0;
      top: 35px;
      right: 0;
      bottom: 0;
    }
    &.open.top {
      border-radius: 0 0 theme('borderRadius.md') theme('borderRadius.md');
      translate: 0 0;
      top: 0;
      left: 0;
      right: 0;
    }
    &.open.bottom {
      border-radius: theme('borderRadius.md') theme('borderRadius.md') 0 0;
      translate: 0 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  @starting-style {
    .drawer.open.left {
      display: block;
      translate: -50% 0;
    }
    .drawer.open.right {
      display: block;
      translate: 50% 0;
    }
    .drawer.open.top {
      display: block;
      translate: 0 -50%;
    }
    .drawer.open.bottom {
      display: block;
      translate: 0 50%;
    }
  }

</style>