import path from 'path';
import { readFile } from 'node:fs/promises';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'fileToRead.txt';

const read = async () => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    readFile(pathToFile, { encoding: 'utf8' })
        .then((data) => console.log(data))
        .catch((e) => console.log('FS operation failed'));
};

await read();