import { spawn } from 'child_process';
import EventEmitter from 'events';
import { mkdirSync, statSync } from 'fs';

import cliProgress from 'cli-progress';
import ffmpeg from 'ffmpeg-static';
import log4js from 'log4js';
import ytdl from 'ytdl-core';

import { YouTube } from './youtube.js';

let logger;

export class Progress extends EventEmitter {
    progress = {
        audio: { current: 0, total: 0, done: false },
        video: { current: 0, total: 0, done: false },
        wip: false,
        done: false,
    };
    progressBar = null;
    constructor(id, progressBar, outdir = './') {
        super();
        logger = log4js.getLogger('downloader');
        logger.level = process.env.LOG_LEVEL || 'error';
        this.progressBar = progressBar;
        try {
            mkdirSync(outdir, { recursive: true });
        } catch {}
        try {
            statSync(`${outdir}/${id}.mp4`);
            this.progressBar.update(100, { id });
            this.progressBar.stop();
            this.progress.done = true;
            return;
        } catch {
            this.progressBar.update(0, { id });
        }
        const timer = setInterval(() => {
            if (this.progress.wip) {
                this.start(id, outdir);
                clearInterval(timer);
            }
        }, 1000);
    }
    start(id, outdir) {
        this.audio = ytdl(id, { quality: 'highestaudio' })
            .on('progress', (_, download, total) => {
                this.progress.audio.current = download;
                this.progress.audio.total = total;
            })
            .on('error', error => logger.debug(error))
            .on('close', () => this.progress.audio.done = true);
        this.video = ytdl(id, { quality: 'highestvideo' })
            .on('progress', (_, download, total) => {
                this.progress.video.current = download;
                this.progress.video.total = total;
            })
            .on('error', error => logger.debug(error))
            .on('close', () => this.progress.video.done = true);
        const child = spawn(ffmpeg, [
            '-loglevel', '8', '-hide_banner',
            '-i', 'pipe:3',
            '-i', 'pipe:4',
            '-map', '0:a',
            '-map', '1:v',
            '-c:v', 'copy',
            `${outdir}/${id}.mp4`,
        ], {
            windowsHide: true,
            stdio: [
                // stdin, stdout, stderr
                'inherit', 'inherit', 'inherit',
                // pipe:3, pipe:4
                'pipe', 'pipe',
            ],
        })
            .on('error', error => logger.debug(error));
        this.audio.pipe(child.stdio[3]);
        this.video.pipe(child.stdio[4]);
        const timer = setInterval(() => {
            const current = this.progress.audio.current + this.progress.video.current;
            const total = this.progress.audio.total + this.progress.video.total;
            this.emit(
                'progress',
                current,
                total,
            );
            this.progressBar.update(
                Math.floor(total ? current / total * 100 : 0),
                { id },
            );
        }, 100);
        child.on('close', () => {
            clearInterval(timer);
            this.emit('end');
            // this.progressBar.stop();
            this.progress.wip = false;
            this.progress.done = true;
            this.progressBar.update(100, { id });
        });
    }
}

export class Downloader {
    key = process.env.API_KEY;
    /** @type {Progress[]} */
    queue = [];
    multibar = new cliProgress.MultiBar({
        format: ' {id} [{bar}] {value}%',
        clearOnComplete: false,
        hideCursor: true,
    }, cliProgress.Presets.legacy);
    constructor(key) {
        console.log();
        this.key = key ?? this.key;
        const timer = setInterval(async () => {
            for (let i = 0; i < this.queue.length; i++) {
                const wipCount = this.queue
                    .map(p => p.progress.wip)
                    .reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
                if (
                    this.queue[i]?.progress
                        && !this.queue[i].progress.wip
                        && !this.queue[i].progress.done
                        && wipCount < (process.env.MAX_THREAD_COUNT || 4)
                ) {
                    this.queue[i].progress.wip = true;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            const done = this.queue.reduce((acc, cur) => {
                return acc && cur.progress.done;
            }, !!this.queue.length);
            if (done) {
                clearInterval(timer);
                console.log();
                logger.info('done');
                this.multibar?.stop();
                process.exit(0);
            }
        }, 100);
    }
    async download(argv) {
        if (argv.channel) {
            this.downloadAllFromChannel(argv.id, argv.outdir);
        } else if (argv.list) {
            this.downloadAllFromPlaylist(argv.id, argv.outdir);
        } else {
            this.downloadSingleVideo(argv.id, argv.outdir);
        }
    }
    async downloadSingleVideo(id, outdir = './') {
        id = ytdl.getVideoID(id);
        const progressBar = this.multibar.create(100, 0);
        this.queue.push(new Progress(id, progressBar, outdir));
    }
    async downloadAllFromPlaylist(playlistId, outdir = './') {
        if (/https?:/.test(playlistId)) {
            playlistId = /list=(?<id>[^&]*)/.exec(playlistId)?.groups['id'];
        }
        const y = new YouTube(process.env.API_KEY);
        const list = await y.playlist({ id: playlistId });
        if (!list) {
            throw new Error('couldn\'t download');
        }
        for (const id of list.map(item => item?.id)) {
            this.downloadSingleVideo(id, outdir);
        }
    }
    async downloadAllFromChannel(channelId, outdir = './') {
        if (!/https?:/.test(channelId)) {
            channelId = `https://www.youtube.com/channel/${channelId}`;
        }
        channelId = /channel\/(?<id>[^?]*)/.exec(channelId)?.groups['id'];
        const y = new YouTube(process.env.API_KEY);
        const list = await y.channel({ id: channelId });
        if (!list) {
            throw new Error('couldn\'t download');
        }
        for (const id of list.map(item => item?.id)) {
            this.downloadSingleVideo(id, outdir);
        }
    }
}
