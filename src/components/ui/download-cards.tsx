import { Command } from '@tauri-apps/api/shell';
import { downloads } from 'aria2n/bin/types';

import aria2 from '@/lib/aria2';
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

const DownloadCards = (props: downloads) => {
    const pauseDownload = () => {
        aria2.pauseDownload(props.gid!);
    };

    const resumeDownload = () => {
        aria2.resumeDownload(props.gid!);
    };

    // const removeDownload = async () => {
    //     const exist = await exists(props.path + props.name);
    //     console.log(props.path + props.name);
    //     console.log(exist);
    //     if (exist) {
    //         // removeDir(props.path + props.name, { recursive: true });
    //         // removeFile(props.path + props.name);
    //         // removeFile(props.path + props.name + '.aria2');
    //     }
    // };

    const openDirectory = async () => {
        console.log(props.path);
        const command = new Command('open-directory', [props.path]);
        command.execute();
    };

    return (
        <div
            // key={props./}
            className='bg-background w-[calc(100%-2px)]  align-middle self-center rounded-lg flex justify-between gap-4 px-8 h-28 items-center'
        >
            <div className='flex w-full flex-col gap-1'>
                <div className='w-full flex justify-between'>
                    <div className='flex'>
                        <img className='' src='../../assets/react.svg' />{' '}
                        {/** todo)) need to make it dynamic */}
                        <div className=''>{props.name}</div>
                    </div>
                    <div className=''>{props.progress.toFixed(2) + '%'}</div>
                </div>
                <div className=' w-full'>
                    <Progress
                        value={props.progress}
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
                {/* <Icons.close
                    className='cursor-pointer'
                    onClick={removeDownload}
                /> */}
                <Icons.folder
                    className='cursor-pointer'
                    onClick={openDirectory}
                />
            </div>
        </div>
    );
};

export default DownloadCards;
