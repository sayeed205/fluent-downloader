import { useEffect, useState } from 'react';

import DownloadCards from '@/components/ui/download-cards';
import aria2 from '@/lib/aria2';

const All = () => {
    const [downloads, setDownloads] = useState<any[]>([]);

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

    // console.log(downloads);

    return (
        <main className='flex flex-col justify-center gap-2 w-full items-center mt-2 self-center'>
            {/* todo)) make this multi window later */}
            {downloads.map(download => (
                <DownloadCards
                    key={download.gid}
                    {...download}
                    // aria={aria2}
                    // name={download.name}
                    // size={download.size}
                    // progress={download.progress}
                    // status={download.status}
                    // speed={download.speed}
                    // downloaded={download.downloaded}
                    // eta={download.eta}
                    // type={download.type}
                />
            ))}
            {/* <DataTable columns={columns} data={downloads} className={} /> */}
        </main>
    );
};

export { All };
