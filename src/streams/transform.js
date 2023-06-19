import { stdin, stdout } from 'node:process';

const transform = async () => {
    const transform = (data) => data.toString().split('').reverse().join('');
    stdin.on('data', (data) => {
        stdout.write(transform(data));
        stdout.write('\n');
    });
};

await transform();