import type { Snippet } from 'svelte';

export type Tab = {
  id: string;
  name: string;
  content: Snippet<[]>;
};

export type TabContext = {
  registerTab: (id: string, name: string, content: Snippet<[]>) => () => void;
  active: Tab | null;
};
