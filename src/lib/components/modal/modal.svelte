<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
  children: Snippet<
    [
      {
        open: boolean;
        close: () => void;
      },
    ]
  >;
  header?: Snippet<
    [
      {
        open: boolean;
        close: () => void;
      },
    ]
  >;
  footer?: Snippet<
    [
      {
        open: boolean;
        close: () => void;
      },
    ]
  >;
  open?: boolean;
  onclose?: () => void;
}

let {
  open = $bindable(false),
  children,
  header,
  footer,
  onclose = () => {},
}: Props = $props();

let dialogEl: HTMLDialogElement;

$effect(() => {
  if (open && dialogEl) {
    dialogEl.showModal();
  }
});

$effect(() => {
  if (!open && dialogEl) {
    dialogEl.close();
  }
});

$effect(() => {
  if (dialogEl) {
    dialogEl.addEventListener('close', () => {
      open = false;
      onclose();
    });
  }
});
</script>

<dialog
  class="backdrop:bg-slate-700/40 w-full"
  bind:this={dialogEl}
>
  {#if header}
    {@render header({
      open,
      close: () => open = false,
    })}
  {/if}

  {@render children({
    open: open,
    close: () => {
      open = false;
    }
  })}

  {#if footer}
    {@render footer({
      open,
      close: () => open = false,
    })}
  {/if}
</dialog>