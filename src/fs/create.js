import path from 'path';
import { access, constants, writeFile } from 'node:fs/promises';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'fresh.txt';
const text = 'I am fresh and young';

const create = async () => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    access(pathToFile, constants.R_OK | constants.W_OK)
        .then(() => {
            throw new Error('FS operation failed: file already exists');
        })
        .catch((e) => {
            if (e.message !== 'FS operation failed: file already exists') {
                writeFile(pathToFile, text).then(() => console.log('file created'));
            } else {
                console.log(e.message);
            }
        });
};

await create();