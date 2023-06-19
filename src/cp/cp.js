import path from 'path';
import { fork } from 'node:child_process';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'script.js';

const spawnChildProcess = async (args) => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    const child = fork(pathToFile, args);
    child.on('error', (err) => {
      console.log('Error', err);
    });
    child.on('message', (msg) => {
      console.log('Message from child:', msg);
    });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
