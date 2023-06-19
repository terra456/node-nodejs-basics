import path from 'path';
import { rm } from 'node:fs/promises';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'fileToRemove.txt';

const remove = async () => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    rm(pathToFile)
        .then(() => console.log('deleted'))
        .catch(() => {
            console.log('FS operation failed: no such file');
        })
};

await remove();