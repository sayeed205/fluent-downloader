import { Icons } from '../icons';
import { Progress } from './progress';

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
        <div className='bg-background w-[calc(100%-10px)]  align-middle self-center rounded-lg flex justify-between gap-4 px-8 h-28 items-center'>
            <div className='flex w-full flex-col gap-1'>
                <div className='w-full flex justify-between'>
                    <div className='flex'>
                        <img className='' src='/vite.svg' />{' '}
                        {/** todo)) need to make it dynamic */}
                        <div className=''>{props.name}</div>
                    </div>
                    <div className=''>{props.progress}</div>
                </div>
                <div className=' w-full'>
                    <Progress
                        value={props.progress}
                        className='h-1 bg-red-400'
                    />
                </div>
                <div className='w-full flex justify-between'>
                    <div className=''>
                        {props.downloaded + '/' + props.size}
                    </div>
                    <div className=''>{props.eta}</div>
                    <div className=''>{props.speed}</div>
                </div>
            </div>
            <div className='flex self-center align-middle gap-4 max-w-[100px]'>
                <Icons.pause />
                <Icons.play />
                <Icons.close />
            </div>
        </div>
    );
};

export default DownloadCards;
