import workers from '../../service-workers/index';

class TestingProvider {
  events: MessageEvent<any>[] = $state([]);
  worker: SharedWorker;
  constructor() {
    this.worker = workers['ww.ts'];
    this.#init();
  }
  async #init() {
    this.worker.port.addEventListener('message', (e) => {
      console.info('hello there', e);
      this.events.push(e);
    });
  }
  sendMessage(message: [number, number]) {
    this.worker.port.postMessage(message);
  }
}

export const testingProvider = new TestingProvider();
