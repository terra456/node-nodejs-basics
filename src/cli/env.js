import { env } from 'node:process';

const parseEnv = () => {
    const arr = Object.keys(env)
        .filter((el) => el.toString().includes('RSS_'))
        .map((el) => `${el}=${env[el]}`);
    console.log(arr.join('; '));
};

parseEnv();