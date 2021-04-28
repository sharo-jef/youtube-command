#!/usr/bin/env node -r dotenv/config
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { YouTube } from './youtube.js';

const youtube = new YouTube(process.env.API_KEY);

yargs(hideBin(process.argv))
    .scriptName('youtube')
    .locale('en')
    .demandCommand()
    .command('channel <id>', 'get channel data', argv => {
        return argv
            .positional('id', {
                type: 'string',
                desc: 'channel id',
            })
            .option('full', {
                alias: ['f'],
                desc: 'return full data',
                type: 'boolean',
            });
    }, async argv => console.log(JSON.stringify(await youtube.channel(argv))))
    .argv;
