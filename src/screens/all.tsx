import { Download } from '@/components/columns';
import DownloadCards from '@/components/ui/download-cards';

// import DownloadCards from '@/components/ui/download-cards';

const downloads: Download[] = [
    {
        name: 'Download 1',
        size: '1.2 GB',
        progress: 69.2,
        status: 'Downloading',
        speed: '1.2 MB/s',
        downloaded: '600 MB',
        eta: '5 minutes',
        type: 'video',
    },
    {
        name: 'Download 2',
        size: '6.9 GB',
        progress: 100,
        status: 'Completed',
        speed: '1.2 MB/s',
        downloaded: '6.9 GB',
        eta: '0 minutes',
        type: 'zip',
    },
];

const All = () => {
    return (
        <main className='flex flex-col justify-center gap-1 w-full mt-1 '>
            {/* Buttons <Icons.check /> */}
            {downloads.map(download => (
                <DownloadCards
                    key={download.name}
                    name={download.name}
                    size={download.size}
                    progress={download.progress}
                    status={download.status}
                    speed={download.speed}
                    downloaded={download.downloaded}
                    eta={download.eta}
                    type={download.type}
                />
            ))}
            {/* <DataTable columns={columns} data={downloads} className={} /> */}
        </main>
    );
};

export { All };
