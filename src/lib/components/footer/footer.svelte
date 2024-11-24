<script lang="ts">
import { keybindings } from '$lib/providers/keybindings.svelte';
</script>

<div class="flex gap-2">
  <div>
    {keybindings.mode}
  </div>
  <div>
    {keybindings.buffer.join(' ')}
  </div>
</div>