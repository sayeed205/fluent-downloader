export interface Aria2nOptions {
    ws?: boolean;
    host?: string;
    port?: number;
    secure?: boolean;
    secret?: string;
}

export type Aria2Version = {
    enabledFeatures: string[];
    version: string;
};

export type Status = {
    bitfield: string;
    completedLength: string;
    connections: string;
    dir: string;
    downloadSpeed: string;
    files: File[];
    gid: string;
    numPieces: string;
    pieceLength: string;
    status: string;
    totalLength: string;
    uploadLength: string;
    uploadSpeed: string;
};

export type File = {
    index: string;
    length: string;
    path: string;
    selected: string;
    uris: Uri[];
};

export type Uri = {
    status: string;
    uri: string;
};

export type Key =
    | 'bitfield'
    | 'completedLength'
    | 'connections'
    | 'dir'
    | 'downloadSpeed'
    | 'files'
    | 'gid'
    | 'numPieces'
    | 'pieceLength'
    | 'status'
    | 'totalLength'
    | 'uploadLength'
    | 'uploadSpeed';
