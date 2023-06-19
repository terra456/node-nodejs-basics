import path from 'path';
import { getDirAndFile } from '../utils.js';
import { cpus } from 'os';
import { Worker  } from 'node:worker_threads';

const { __dirname } = getDirAndFile(import.meta.url);

const performCalculations = async () => {
    const cpusCount = cpus().length;
    const promises = Array(cpusCount).fill('').map((el, i) => {
        const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
            workerData: i + 10,
        });
        const promise = new Promise((res, rej) => {
            worker.on('message', (str) => {
                res({status: 'resolved', data: str});
            })
            worker.on('error', () => {
                rej({status: 'error', data: null});
            })
        });
        return promise;
    });
    Promise.allSettled(promises)
        .then((res) => {
            const result = res.map((el) => el.value ? el.value : el.reason);
            console.log(result);
            return result;
        });
    
};

await performCalculations();