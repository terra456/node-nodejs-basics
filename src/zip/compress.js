import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { getDirAndFile } from '../utils.js';
import { createGzip } from 'zlib';

const { __dirname } = getDirAndFile(import.meta.url);
const srcDir = 'files';
const srcName = 'fileToCompress.txt';
const distDir = srcDir;
const distName = 'archive.gz';

const compress = async () => {
    const srcFile = path.resolve(__dirname, srcDir, srcName);
    const distFile = path.resolve(__dirname, distDir, distName);
    const readStream = createReadStream(srcFile);
    const writeStream = createWriteStream(distFile);
    const compressStream = createGzip();
    const onError = () => {
        console.log('Do not compressed');
        readStream.destroy();
        writeStream.end();
    }
    readStream
        .on('error', onError)
        .pipe(compressStream)
        .on('error', onError)
        .pipe(writeStream)
        .on('error', onError);
};

await compress();