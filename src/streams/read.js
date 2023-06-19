import path from 'path';
import { stdout } from 'node:process';
import { createReadStream } from 'fs';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'fileToRead.txt';

const read = async () => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    const readStream = createReadStream(pathToFile);
    readStream.on('data', (chunk) => {
        stdout.write(chunk);
    });
    readStream.on('error', (e) => {
        stdout.write('Error when read file \n');
    })
    readStream.on('end', () => {
        stdout.write('\n');
    })
};

await read();
