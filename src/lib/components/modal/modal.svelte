<script lang="ts">
import type { Snippet } from 'svelte';

type SnippetProps = {
  open: boolean;
  close: () => void;
};

interface Props {
  children: Snippet<[SnippetProps]>;
  header?: Snippet<[SnippetProps]>;
  footer?: Snippet<[SnippetProps]>;
  open?: boolean;
  onclose?: () => void;
  backgroundClass?: string;
  class?: string;
}

let {
  open = $bindable(false),
  children,
  header,
  footer,
  backgroundClass = 'backdrop:bg-zinc-700/40 w-full',
  class: className = '',
  onclose = () => {},
}: Props = $props();

let dialogEl: HTMLDialogElement;

function onDialogClose() {
  open = false;
  onclose();
}

$effect(() => {
  if (open && dialogEl) {
    dialogEl.showModal();
  } else if (!open && dialogEl) {
    dialogEl.close();
  }
});

$effect(() => {
  if (dialogEl) {
    dialogEl.addEventListener('close', onDialogClose);
    return () => {
      dialogEl.removeEventListener('close', onDialogClose);
    };
  }
});
</script>

<dialog
  class={`${backgroundClass} ${className}`}
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