import path from 'path';
import { access, constants, rename as renameFs } from 'node:fs/promises';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const dirName = 'files';
const oldName = 'wrongFilename.txt';
const newName = 'properFilename';

const rename = async () => {
    const sourceFile = path.resolve(__dirname, dirName, oldName);
    const distFile = path.resolve(__dirname, dirName, newName + '.md');
    console.log(distFile);
    access(distFile, constants.R_OK | constants.W_OK)
        .then(() => {
            throw new Error('FS operation failed: file already exists');
        })
        .catch((e) => {
            if (e.message === 'FS operation failed: file already exists') {
                console.log(e.message);
            } else {
                renameFs(sourceFile, distFile)
                    .then(() => console.log('renamed'))
                    .catch((e) => {
                        console.log('FS operation failed', ' ', e.message);
                    });
            }
        });
};

await rename();