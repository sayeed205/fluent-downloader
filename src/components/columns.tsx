import { ColumnDef } from '@tanstack/react-table';

export type Download = {
    name: string;
    size: string;
    progress: number;
    status:
        | 'Downloading'
        | 'Completed'
        | 'Paused'
        | 'Error'
        | 'Queued'
        | 'Seeding';
    speed: string;
    downloaded: string;
    eta: string;
    type: string;
};

export const columns: ColumnDef<Download>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
    {
        accessorKey: 'progress',
        header: 'Progress',
    },
    {
        accessorKey: 'speed',
        header: 'Speed',
    },
    {
        accessorKey: 'downloaded',
        header: 'Downloaded',
    },
    {
        accessorKey: 'eta',
        header: 'ETA',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
];
