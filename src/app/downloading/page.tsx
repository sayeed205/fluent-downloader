'use client';

import { listen } from '@tauri-apps/api/event';
import { useState } from 'react';

export default function Downloading() {
    const [progress, setProgress] = useState({
        progress: '0',
        speed: '0',
        eta: '0',
        downloaded: '0',
    });

    listen('progress', event => {
        console.log(event.payload);
        // setProgress(event.payload);

        const e = event.payload as unknown as {
            progress: string;
            speed: string;
            eta: string;
            downloaded: string;
        };
        setProgress(e);
    });

    listen('error', event => {
        console.log(event.payload);
    });

    listen('done', event => {
        console.log(event.payload);
    });

    return (
        <main className=''>
            <div className=''>Downloaded: {progress.progress}</div>
            <div className=''>Speed: {progress.speed}</div>
            <div className=''>ETA: {progress.eta}</div>
            <div className=''>Downloaded: {progress.downloaded}</div>
        </main>
    );
}
