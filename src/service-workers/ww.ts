import { invoke } from '@tauri-apps/api/core';

self.onconnect = async (event) => {
  const port = event.ports[0];
  const response = await invoke('greet', { name: 'bob' });

  port.onmessage = (e) => {
    // console.info(items);
    const workerResult = e.data[0] * e.data[1];
    port.postMessage(workerResult);
    port.postMessage(response);
    // port.postMessage(items);
  };
};
