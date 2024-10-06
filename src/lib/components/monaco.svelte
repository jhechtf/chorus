<script lang="ts">
import type monaco from 'monaco-editor';
import { onMount } from 'svelte';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

let divEl: HTMLDivElement;
let editor: monaco.editor.IStandaloneCodeEditor;
let Monaco;

interface Props {
  value: string;
  filepath: string;
}

let { value, filepath }: Props = $props();

async function initMonaco() {
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker: function (_moduleId: any, label: string) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };

  Monaco = await import('monaco-editor');

  const fileUri = Monaco.Uri.parse(filepath);
  const model = Monaco.editor.createModel(value, 'typescript', fileUri);

  Monaco.editor.defineTheme('default', {
    base: 'vs-dark',
    inherit: false,
    rules: [
      {
        token: 'identifier',
        foreground: '9CDCFE',
      },
      {
        token: 'identifier.function',
        foreground: 'DCDCAA',
      },
      {
        token: 'type',
        foreground: '1AAFB0',
      },
    ],
    colors: {},
  });

  Monaco.editor.setTheme('default');
}

onMount(async () => {
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker: function (_moduleId: any, label: string) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };

  Monaco = await import('monaco-editor');

  const fileUri = Monaco.Uri.parse(filepath);
  const model = Monaco.editor.createModel(value, 'typescript', fileUri);

  Monaco.editor.defineTheme('default', {
    base: 'vs-dark',
    inherit: false,
    rules: [
      {
        token: 'identifier',
        foreground: '9CDCFE',
      },
      {
        token: 'identifier.function',
        foreground: 'DCDCAA',
      },
      {
        token: 'type',
        foreground: '1AAFB0',
      },
    ],
    colors: {},
  });

  Monaco.editor.setTheme('default');

  editor = Monaco.editor.create(divEl, {
    model: model,
    theme: 'vs-dark',
    automaticLayout: true,
    tabSize: 2,
  });

  return () => {
    editor.dispose();
  };
});
</script>

<div bind:this={divEl} class="h-full">
</div>

