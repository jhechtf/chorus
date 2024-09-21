<script lang="ts" generics="T extends unknown">
  import type { Snippet } from 'svelte';
  type State = 'pending' | 'fulfilled' | 'rejected';

  interface $$Props {
    waitFor: Promise<T>;
    fallback: Snippet<['loading']>;
    error: Snippet<['rejected', unknown]>;
    children: Snippet<[T]>;
  }
  const { children, waitFor, fallback, error }: $$Props = $props();

  let state: State = $state('pending');
  waitFor.then(r => {
    state = 'fulfilled';
  })
  .catch(e => {
    state = 'rejected';
  })
</script>

{#await waitFor}
  {@render fallback('loading')}
{:then value}
  {@render children(value)}
{:catch error}
  {@render error('re', error)}
{/await}
