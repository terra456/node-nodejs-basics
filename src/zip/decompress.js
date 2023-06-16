import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { getDirAndFile } from '../utils.js';
import { createGunzip } from 'zlib';

const { __dirname } = getDirAndFile(import.meta.url);
const srcDir = 'files';
const srcName = 'archive.gz';
const distDir = srcDir;
const distName = 'fileToDecompress.txt';

const decompress = async () => {
    const srcFile = path.resolve(__dirname, srcDir, srcName);
    const distFile = path.resolve(__dirname, distDir, distName);
    const readStream = createReadStream(srcFile);
    const writeStream = createWriteStream(distFile);
    const decompressStream = createGunzip();
    const onError = () => {
        console.log('Not decompressed');
        readStream.destroy();
        writeStream.end();
    }
    readStream
        .on('error', onError)
        .pipe(decompressStream)
        .on('error', onError)
        .pipe(writeStream)
        .on('error', onError);
};

await decompress();