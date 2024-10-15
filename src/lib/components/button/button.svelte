<script lang="ts" context="module">
import { HTMLButtonAttributes } from 'svelte/elements';
export interface ButtonProps extends HTMLButtonAttributes {
  size?: 'sm' | 'md' | 'lg';
}
</script>
<script lang="ts">

  let { size = 'md', children, class: className = '', ...restProps }: ButtonProps = $props();

</script>

<button {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</button>
