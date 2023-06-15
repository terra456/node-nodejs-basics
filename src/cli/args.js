import { argv } from 'node:process';

const parseArgs = () => {
    const res = argv.map((el, i) => {
        if (el.startsWith('--')) {
            return(`${el} is ${argv[i + 1]}`)
        }
    }).filter((el) => el);
    console.log(res.join(', '));
};

parseArgs();