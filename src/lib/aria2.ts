import { Key, Status } from '@/types';

const DEFAULT_ARIA2 = {
    name: 'Aria2',
    rpcUrl: 'http://localhost:6800/jsonrpc',
    secretKey: '',
};

class Aria2 {
    private static requestId = 0;
    private socket: WebSocket | null = null;
    private rpcUrl = DEFAULT_ARIA2.rpcUrl;
    private name = DEFAULT_ARIA2.name;
    private secretKey = DEFAULT_ARIA2.secretKey;

    private _messageHandlers: Array<Function> = [];

    constructor(aria2 = DEFAULT_ARIA2) {
        Object.assign(this, aria2);
    }

    get sid(): number {
        return Aria2.requestId++;
    }

    openSocket(): WebSocket | null {
        let url = this.rpcUrl;
        if (url.startsWith('http')) url = url.replace('http', 'ws');

        if (
            this.socket &&
            this.socket.url == url &&
            this.socket.readyState <= 1
        )
            return this.socket;

        try {
            this.socket = new WebSocket(url);
            this.socket.addEventListener('message', this.onMessage.bind(this));
        } catch (error) {
            this.socket = null;
            console.error(error);
        }
        return this.socket;
    }

    closeSocket() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    private onMessage(event: MessageEvent) {
        try {
            let data = JSON.parse(event.data);
            data.source = this;
            this._messageHandlers.forEach(handle => {
                handle(data);
            });
        } catch (error) {
            console.error(`${this.name} got an invalid message`);
        }
    }

    private async doRPC(request: { url: string; payload: string; id: number }) {
        let url = request.url;
        let socket = this.socket;
        return new Promise<any>((resolve, reject) => {
            /* via WebSocket */
            if (socket) {
                switch (socket.readyState) {
                    case WebSocket.CONNECTING:
                        socket.onopen = () => {
                            socket && socket.send(request.payload);
                        };
                        break;
                    case WebSocket.OPEN:
                        socket.send(request.payload);
                        break;
                    case WebSocket.CLOSING:
                    case WebSocket.CLOSED:
                        this.socket = null;
                        let error = new Error('Aria2 is unreachable');
                        reject(error);
                        break;
                    default:
                        error = new Error(
                            `Unknown socket state: ${socket.readyState}`
                        );
                        reject(error);
                }
                socket.onmessage = event => {
                    let response = JSON.parse(event.data);
                    if (response.id == request.id) resolve(response);
                };
                socket.onclose = () => {
                    this.socket = null;
                    reject(new Error('WebSocket is closed'));
                };
                socket.onerror = () => {
                    this.socket = null;
                    reject(new Error('Aria2 is unreachable'));
                };
            } else {
                /* via HTTP fetch */
                if (url.startsWith('ws')) url = url.replace('ws', 'http');

                fetch(url, {
                    method: 'POST',
                    body: request.payload,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(json => resolve(json))
                    .catch(error => reject(error));
            }
        });
    }

    private buildRequest(
        method: string,
        params: any[]
    ): { id: number; url: string; payload: string } {
        let id = this.sid;
        let request = { id, url: this.rpcUrl, payload: '' };
        if (this.secretKey) {
            params.unshift('token:' + this.secretKey);
        }
        request.payload = JSON.stringify({
            jsonrpc: '2.0',
            method,
            id,
            params,
        });
        // console.log(request);
        return request;
    }

    addUri(uris: string | string[], options?: any): Promise<any> {
        if (!Array.isArray(uris)) uris = [uris];
        let request = this.buildRequest('aria2.addUri', [uris, options]);
        return this.doRPC(request);
    }

    // getGlobalStat(): Promise<any> {
    //     let request = this.buildRequest('aria2.getGlobalStat');
    //     return this.doRPC(request);
    // }

    // getFiles(gid: string): Promise<any> {
    //     let request = this.buildRequest('aria2.getFiles', gid);
    //     return this.doRPC(request);
    // }

    setGlobalOptions(options: any): Promise<any> {
        let request = this.buildRequest('aria2.changeGlobalOption', options);
        return this.doRPC(request);
    }

    async getDownloads(gids: string[] = [], keys: Key[] = []) {
        if (gids.length > 0) {
            const downloads = [];
            for (const gid of gids) {
                const download = await this.getStatus(gid, keys);
                downloads.push(download);
            }
            return downloads;
        }
        const active = await this.getActiveDownloads(keys);
        // console.log(active);
        const waiting = await this.getWaitingDownloads(0, 1000, keys);
        const stopped = await this.getStoppedDownloads(0, 1000, keys);
        const downloads = [...active, ...waiting, ...stopped];
        return downloads;
    }

    async onProgress(cb: (downloads: Status[]) => void) {
        while (true) {
            const downloads = await this.getDownloads();
            cb(downloads);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    async pauseDownload(gid: string) {
        let request = this.buildRequest('aria2.pause', [gid]);
        return (await this.doRPC(request)) as Promise<string>;
    }

    async resumeDownload(gid: string) {
        let request = this.buildRequest('aria2.unpause', [gid]);
        return (await this.doRPC(request)) as Promise<string>;
    }

    async getStatus(gid: string, keys: Key[] = []) {
        let request = this.buildRequest('aria2.tellStatus', [gid, keys]);
        const result = await this.doRPC(request);
        return result.result as Promise<Status>;
    }

    async getActiveDownloads(keys: Key[] = []) {
        let request = this.buildRequest('aria2.tellActive', [keys]);
        const result = await this.doRPC(request);
        return result.result as Promise<Status[]>;
    }

    async getWaitingDownloads(offset: number, limit: number, keys: Key[] = []) {
        let request = this.buildRequest('aria2.tellWaiting', [
            offset,
            limit,
            keys,
        ]);
        const result = await this.doRPC(request);
        return result.result as Promise<Status[]>;
    }

    async getStoppedDownloads(offset: number, limit: number, keys: Key[] = []) {
        let request = this.buildRequest('aria2.tellStopped', [
            offset,
            limit,
            keys,
        ]);
        const result = await this.doRPC(request);
        return result.result as Promise<Status[]>;
    }
}

export default Aria2;
