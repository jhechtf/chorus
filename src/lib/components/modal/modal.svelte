<script lang="ts">
  import LazyLoader from "../lazy-loader/lazy-loader.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet<[{
      open: boolean;
      close: () => void;
    }]>;
    header?: Snippet<[{
      open: boolean;
      close: () => void;
    }]>;
    footer?: Snippet<[{
      open: boolean;
      close: () => void;
    }]>;
    open: boolean;
  }

  let { open = $bindable(false), children, header, footer}: Props = $props();


  let dialogEl: HTMLDialogElement;

  $effect(() => {
    if(open && dialogEl) {
      dialogEl.showModal();
    }
  })

  $effect(() => {
    if(!open && dialogEl) {
      dialogEl.close();
    }
  })

</script>

<dialog
  class="text-zinc-50 shadow shadow-zinc-400/30 w-10/12 p-3 backdrop:bg-slate-700/40 bg-zinc-800"
  bind:this={dialogEl}
  onclick={(e) => {
    if(e.target === dialogEl) {
      dialogEl.close();
    }
  }}
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