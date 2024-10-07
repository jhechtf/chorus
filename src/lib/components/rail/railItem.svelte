<script lang="ts" module>
import type { Snippet } from 'svelte';

export interface Props {
  children: Snippet<[]>;
}
</script>
<script lang="ts">
let { children }: Props = $props();
</script>

<div class="hover:bg-zinc-800 flex justify-center rounded p-2">
  <!-- {#if children} -->
    {@render children()}
  <!-- {/if} -->
</div>
