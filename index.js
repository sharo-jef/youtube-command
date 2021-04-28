#!/usr/bin/env node -r dotenv/config
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Config } from './config.js';
import { YouTube } from './youtube.js';

Config.load();

const youtube = new YouTube(process.env.API_KEY);

yargs(hideBin(process.argv))
    .scriptName('youtube')
    .locale('en')
    .demandCommand()
    .command('config <key> [value]', 'save config', argv => {
        return argv
            .positional('key', {
                type: 'string',
                desc: 'key',
            })
            .positional('value', {
                type: 'string',
                desc: 'value',
            });
    }, argv => Config.saveFromCommand(argv))
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
