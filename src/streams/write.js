import path from 'path';
import { stdin, stdout } from 'node:process';
import { createWriteStream } from 'fs';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'fileToWrite.txt';

const write = async () => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    const writeStream = createWriteStream(pathToFile);
    stdin.on('data', (data) => {
        writeStream.write(data);
    });
    stdin.on('exit', () => {
        writeStream.end();
    });
    writeStream.on('error', (e) => {
        console.log('No such file');
        process.exit();
    });
};

await write();