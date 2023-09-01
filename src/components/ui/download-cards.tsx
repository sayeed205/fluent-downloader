type DownloadProps = {
    name: string;
    size: string;
    progress: number;
    status: string;
    speed: string;
    downloaded: string;
    eta: string;
    type: string;
};

const DownloadCards = (props: DownloadProps) => {
    return (
        <div className='bg-background w-[calc(100%-10px)]'>
            <div className=''>name: {props.name}</div>
            <div className=''></div>
        </div>
    );
};

export default DownloadCards;
