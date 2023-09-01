import DownloadCards from '@/components/ui/download-cards';

const downloads = [
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
        downloaded: '600 MB',
        eta: '5 minutes',
        type: 'zip',
    },
];

const All = () => {
    return (
        <main className='flex flex-col justify-center gap-1'>
            {/* <DownloadCards /> */}
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
        </main>
    );
};

export { All };
