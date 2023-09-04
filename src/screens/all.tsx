// import Aria2n from 'aria2n';
import { useEffect, useState } from 'react';

import AddDownloadForm from '@/components/add-download';
import DownloadCards from '@/components/ui/download-cards';
import Aria2 from '@/lib/aria2';
import { Status } from '@/types';

// const aria2 = new Aria2n({
//     ws: false,
//     host: 'localhost',
//     port: 6800,
//     secure: false,
//     secret: '',
// });

const aria2 = new Aria2();

// const downloads: Download[] = [
//     {
//         name: 'Download 1',
//         size: '1.2 GB',
//         progress: 69.2,
//         status: 'Downloading',
//         speed: '1.2 MB/s',
//         downloaded: '600 MB',
//         eta: '5 minutes',
//         type: 'video',
//     },
//     {
//         name: 'Download 2',
//         size: '6.9 GB',
//         progress: 100,
//         status: 'Completed',
//         speed: '1.2 MB/s',
//         downloaded: '6.9 GB',
//         eta: '0 minutes',
//         type: 'zip',
//     },
// ];

const All = () => {
    const [downloads, setDownloads] = useState<Status[]>([]);

    const runAria = async () => {
        aria2.openSocket();
        const downloads = await aria2.getDownloads();
        setDownloads(downloads);
        aria2.onProgress((downloads: Status[]) => {
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
            <AddDownloadForm />
            {downloads.map(download => (
                <DownloadCards
                    key={download.gid}
                    props={download}
                    aria={aria2}
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
