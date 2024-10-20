<script lang="ts">
/**
 * 1. Going to need to have some kind of provider or registry for this to populate data from.
 */
import { CodeIcon } from 'lucide-svelte';
import RailItem from './railItem.svelte';
</script>

<div class="rail flex flex-col py-3 bg-zinc-700 text-3xl">
  <RailItem>
    <CodeIcon size="1em"/> 
  </RailItem>
</div>