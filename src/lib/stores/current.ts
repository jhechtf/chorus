import { writable } from 'svelte/store';
import { sep, homeDir } from '@tauri-apps/api/path';

export const workspaceDir = writable<string>(await homeDir());
