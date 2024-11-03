import type { Component } from 'svelte';

export async function lazyLoad<T extends Component = Component>(
  module: string,
): Promise<T> {
  const m = await import(module);
  if (!m.default) throw new Error(`Lazy load failed to load ${module}`);
  return m.default as T;
}
