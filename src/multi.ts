import cluster from 'cluster';
import { cpus } from 'os';
import { pid } from 'process';

void (async () => {
  if (cluster.isPrimary) {
    const numOfCpus = cpus().length;

    console.log(`Primary process started`);
    console.log(`Starting ${numOfCpus} forks`);

    for (let i = 0; i < numOfCpus; i++) cluster.fork();
  } else {
    const id = cluster.worker?.id;
    await import('./app.js');
    console.log(`Worker with id: ${pid} has been spawned`);
  }
})();
