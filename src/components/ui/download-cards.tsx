import Aria2 from '@/lib/aria2';
import { Status } from '@/types';
import { Icons } from '../icons';
import { Progress } from './progress';

// type DownloadProps = {
//     name: string;
//     size: string;
//     progress: number;
//     status: string;
//     speed: string;
//     downloaded: string;
//     eta: string;
//     type: string;
// };

const DownloadCards = ({
    props,
    aria,
}: {
    props: Partial<Status>;
    aria: Aria2;
}) => {
    const pauseDownload = () => {
        aria.pauseDownload(props.gid!);
    };

    const resumeDownload = () => {
        aria.resumeDownload(props.gid!);
    };

    return (
        <div
            // key={props./}
            className='bg-background w-[calc(100%-1rem)]  align-middle self-center rounded-lg flex justify-between gap-4 px-8 h-28 items-center'
        >
            <div className='flex w-full flex-col gap-1'>
                <div className='w-full flex justify-between'>
                    <div className='flex'>
                        <img className='' src='/vite.svg' />{' '}
                        {/** todo)) need to make it dynamic */}
                        <div className=''>
                            {props.files && props.files[0].path}
                        </div>
                    </div>
                    <div className=''>{props?.gid}</div>
                </div>
                <div className=' w-full'>
                    <Progress
                        value={
                            parseInt(props?.totalLength!) /
                            parseInt(props?.completedLength!)
                        }
                        className='h-1 bg-red-400'
                    />
                </div>
                <div className='w-full flex justify-between'>
                    <div className=''>
                        {props.completedLength + '/' + props.totalLength}
                    </div>
                    {/* <div className=''>{props.}</div> */}
                    <div className=''>{props.downloadSpeed}</div>
                </div>
            </div>
            <div className='flex self-center align-middle gap-4 max-w-[100px]'>
                {props.status === 'paused' ? (
                    <Icons.play
                        className='cursor-pointer'
                        onClick={resumeDownload}
                    />
                ) : (
                    <Icons.pause
                        onClick={pauseDownload}
                        className='cursor-pointer'
                    />
                )}
                {/* <Icons.pause />
                <Icons.play /> */}
                <Icons.close />
            </div>
        </div>
    );
};

export default DownloadCards;
