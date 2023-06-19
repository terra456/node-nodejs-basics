import path from 'path';
import { access, constants, cp } from 'node:fs/promises';
import { getDirAndFile } from '../utils.js';

const { __dirname } = getDirAndFile(import.meta.url);
const sourceDir = 'files';
const destDir = 'files_copy';

const copy = async () => {
    const sourcePath = path.resolve(__dirname, sourceDir);
    const destPath = path.resolve(__dirname, destDir);

    access(sourcePath, constants.R_OK | constants.W_OK)
        .then(() => {
            access(destPath, constants.R_OK | constants.W_OK)
                .then(() => {
                    throw new Error('FS operation failed: folder already exists');
                })
                .catch((e) => {
                    if (e.message === 'FS operation failed: folder already exists') {
                        console.log(e.message);
                    } else {
                        cp(sourcePath, destPath, {recursive: true, force: true})
                            .then(() => console.log('copied'))
                            .catch(() => {
                                console.log(e.message);
                            })
                    }
                });
        })
        .catch(() => {
            console.log('FS operation failed: no such folder');
        })
};

await copy();
