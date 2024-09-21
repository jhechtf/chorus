<script lang="ts">
  import '../styles.css';
  import {
    registry
  } from '$lib/stores/modals.svelte';
  const { children } = $props();
</script>
{#if registry.active}
  {@const Component = registry.active.component}
  <Component />
{/if}
{@render children()}