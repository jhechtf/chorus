<script lang="ts">
import { getContext, type Snippet, onMount } from 'svelte';
interface Props {
  id: string;
  name: string;
  children: Snippet<[]>;
}
let { children, id, name }: Props = $props();

const tabContext = getContext<{
  registerTab: (id: string, name: string, content: Snippet<[]>) => () => void;
  active: { id: string; name: string; content: Snippet<[]> } | null;
}>('tabs');

onMount(() => {
  const unregister = tabContext.registerTab(id, name, children);
  return () => {
    unregister();
  };
});
</script>

{#if tabContext.active?.id === id}
  <div class="tab-content">
    {@render children()}
  </div>
{/if}
