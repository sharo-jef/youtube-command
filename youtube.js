import axios from 'axios';
import log4js from 'log4js';

const logger = log4js.getLogger('youtube');
logger.level = 'all';

export class YouTube {
    key = process.env.API_KEY;
    /**
     * @param {string?} key api key
     */
    constructor(key) {
        this.key = key ?? this.key;
    }
    async channel(argv) {
        const config = {
            params: {
                channelId: /https?:\/\//g.test(argv.id) ? /channel\/(?<id>[^/?]*)/.exec(argv.id)?.groups?.id : argv.id,
                part: argv.full ? 'snippet' : 'id',
                maxResults: 50,
            },
        };
        const result = await this._getData('https://www.googleapis.com/youtube/v3/search', config) || [];
        return result
            .filter(d => d?.id?.videoId)
            .map(d => {
                const tmp = { id: d?.id?.videoId };
                if (d?.snippet) {
                    tmp.title = d?.snippet?.title;
                }
                return tmp;
            });
    }
    async playlist(argv) {
        const config = {
            params: {
                playlistId: /https?:\/\//g.test(argv.id) ? /list=(?<id>[^&]*)/.exec(argv.id)?.groups?.id : argv.id,
                part: 'contentDetails',
                maxResults: 50,
            },
        };
        const result = await this._getData('https://www.googleapis.com/youtube/v3/playlistItems', config) || [];

        return result
            .filter(d => d?.contentDetails?.videoId)
            .map(d => {
                const tmp = { id: d?.contentDetails?.videoId };
                return tmp;
            });
    }
    async _getData(url, config = {}) {
        let result = [];

        if (config) {
            config.params.key = this.key;
            config.params.quotaUser = `${new Date().getTime()}`;
        }

        const response = await axios.get(url, config)
            .catch(error => logger.error(error?.response?.data));

        if (response?.data) {
            if (response.data?.items) {
                result = [...result, ...response.data.items];
            }
            if (response.data?.nextPageToken) {
                config.params.pageToken = response.data.nextPageToken;
                result = [...result, ...await this._getData(url, config)];
            }
        }

        return result;
    }
}
