<script lang="ts">
import Modal from '../modal/modal.svelte';
let modalOpen = $state(false);
</script>

<Modal bind:open={modalOpen}>
  <div class="p-3">hi</div>
</Modal>

<button onclick={() => modalOpen = true} class="search w-[20vw] bg-zinc-600 px-2 leading-tight flex items-center justify-center border-zinc-400 border rounded-md overflow-hidden">
  Workspace folders
</button>