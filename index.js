#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Config } from './config.js';
import { Downloader } from './downloader.js';
import { YouTube } from './youtube.js';

Config.load();

const youtube = new YouTube(process.env.API_KEY);
let downloader;

yargs(hideBin(process.argv))
    .scriptName('youtube')
    .locale('en')
    .strictCommands()
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
    .command('data', 'get data', argv => {
        return argv
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
            .command('playlist <id>', 'get playlist data', argv => {
                return argv
                    .positional('id', {
                        type: 'string',
                        desc: 'playlist id',
                    });
                // .option('full', {
                //     alias: ['f'],
                //     desc: 'return full data',
                //     type: 'boolean',
                // });
            }, async argv => console.log(JSON.stringify(await youtube.playlist(argv))));
    })
    .command('download <id>', 'download youtube video', argv => {
        return argv
            .positional('id', {
                type: 'string',
                desc: 'id (or url) of the video',
            })
            .option('channel', {
                alias: ['c'],
                desc: 'download all videos from the channel',
                type: 'boolean',
            })
            .option('list', {
                alias: ['l'],
                desc: 'download all videos from the playlist',
                type: 'boolean',
            })
            .option('outdir', {
                alias: ['o'],
                desc: 'set directory for output videos',
                type: 'string',
            });
    }, argv => {
        downloader = downloader ?? new Downloader(process.env.API_KEY);
        downloader.download(argv);
    })
    .argv;
