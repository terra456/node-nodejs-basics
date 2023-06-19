import path from 'path';
import { stdout } from 'node:process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'fs';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const fileName = 'fileToCalculateHashFor.txt';

const calculateHash = async () => {
    const pathToFile = path.resolve(__dirname, dirName, fileName);
    const hash = createHash('sha256');
    const input = createReadStream(pathToFile);
    input.pipe(hash).setEncoding('hex').pipe(stdout);
    hash.on('end', () => {
        stdout.write('\n');
    });
};

await calculateHash();