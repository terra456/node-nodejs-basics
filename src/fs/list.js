import path from 'path';
import { readdir } from 'node:fs/promises';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const sourceDir = 'files';

const list = async () => {
    const sourcePath = path.resolve(__dirname, sourceDir);
    readdir(sourcePath, {withFileTypes: true})
        .then((files) => {
            for (const file of files) {
                if (file.isFile) {
                    console.log(path.parse(file.name).name);
                }
            }
        })
        .catch(() => {
            console.log('FS operation failed: no such folder');
        })
};

await list();