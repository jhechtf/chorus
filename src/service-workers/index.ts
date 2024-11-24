const workers = ['ww.ts'] as const;

const serviceWorkers = workers.map(
  (worker) =>
    [worker, new SharedWorker(new URL(worker, import.meta.url))] as const,
);

for (const [id, worker] of serviceWorkers) {
  worker.port.start();
}

export default serviceWorkers.reduce(
  (acc, [id, worker]) => {
    acc[id] = worker;
    return acc;
  },
  {} as Record<(typeof workers)[number], SharedWorker>,
);
