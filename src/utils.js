import * as url from 'url';

export const getDirAndFile = (data) => {
  const __filename = url.fileURLToPath(data);
  const __dirname = url.fileURLToPath(new URL('.', data));
  return { __filename, __dirname };
}