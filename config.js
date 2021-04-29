import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export class Config {
    static root = dirname(fileURLToPath(import.meta.url));
    static load() {
        Object.assign(process.env, this.read());
    }
    static saveFromCommand(argv) {
        if (argv.key) {
            this.write(argv.key, argv?.value);
        }
    }
    static read(key) {
        try {
            readFileSync(`${this.root}/.env`);
        } catch {
            writeFileSync(`${this.root}/.env`, '');
        }
        let data = readFileSync('.env', 'utf-8');
        data = data
            .replace(/#.*\r?\n/, '')
            .split(/\r?\n/g)
            .map(d => d.trim())
            .filter(d => d)
            .map(d => ({ .../^(?<key>[^=]+)=(?<value>.*)$/.exec(d)?.groups }));
        if (key) {
            const result = data.find(d => d.key === key);
            if (result) {
                return result;
            } else {
                throw new Error('unknown key');
            }
        } else {
            return data;
        }
    }
    static write(key, value) {
        let data = this.read();
        if (!data.find(d => d.key === key)) {
            data.push({ key, value });
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i]?.key === key) {
                    data[i] = { key, value };
                }
            }
        }
        data = data
            .map(d => `${d?.key ?? ''}=${d?.value ?? ''}`)
            .join('\n');
        writeFileSync(`${this.root}.env`, data);
    }
}
