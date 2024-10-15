import { invoke } from '@tauri-apps/api/core';
import type { BaseDirectory } from '@tauri-apps/plugin-fs';

export function resolve(path: string, baseDirectory?: BaseDirectory) {
  return invoke('chorus_resolve', { path, baseDirectory })
}
