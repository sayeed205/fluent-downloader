import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import DownloadCards from '@/components/ui/download-cards';
import aria2 from '@/lib/aria2';
import { invoke } from '@tauri-apps/api/tauri';
import { downloads } from 'aria2n/bin/types';
import { useEffect, useState } from 'react';

const Home = () => {
    const [downloads, setDownloads] = useState<downloads[]>([]);

    const handleAddTask = async () => {
        invoke('add_task', {});
    };

    const runAria = async () => {
        const downloads = await aria2.getDownloads();
        setDownloads(downloads);
        aria2.onProgress(downloads => {
            downloads = downloads.filter(
                download => download.status !== 'removed'
            );
            setDownloads(downloads);
        });
    };

    useEffect(() => {
        runAria();
    }, []);

    return (
        <div className='flex flex-col gap-2'>
            <div className=''>
                <Button
                    className='flex gap-2 self-start'
                    onClick={handleAddTask}
                >
                    <Icons.plus></Icons.plus>
                    Add
                </Button>
            </div>
            {downloads.map(download => (
                <DownloadCards key={download.gid} {...download} />
            ))}
        </div>
    );
};

export default Home;
