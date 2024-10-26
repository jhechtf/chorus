<script lang="ts">
import { EditorView, minimalSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { gutter, lineNumbers } from '@codemirror/view';
import { onMount } from 'svelte';
import { EditorState } from '@codemirror/state';
import { vim } from '@replit/codemirror-vim';
import { NewMoonExtension } from '$lib/components/codemirror/themes/base'
let editorEl: HTMLDivElement | null = null;
let editor: EditorView | null = $state(null);
let { doc }: { doc: string } = $props();

const editorState = EditorState.create({
  doc,
  extensions: [
    vim(),
    minimalSetup,
    lineNumbers(),
    gutter({
      class: 'cm-gutters',
    }),
    NewMoonExtension,
    javascript({ typescript: true }),
  ],
});

onMount(() => {
  if (editorEl !== null) {
    editor = new EditorView({
      parent: editorEl,
      state: editorState,
    });
  }
});

</script>

<div bind:this={editorEl} class="codemirror h-full w-full"></div>
