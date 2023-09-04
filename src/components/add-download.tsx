import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';

import { Button } from '@/components/ui/button';
import { Icons } from './icons';

const AddDownloadForm = () => {
    const [url, setUrl] = useState('');
    const handleSubmit = async () => {
        // console.log(url);
        // const command = Command.sidecar('bin/yt-dlp', [url]);
        // const output = await command.execute();
        // console.log(output);
        // await invoke('start_download', { url: url });
        // const path = await resolveResource('conf/aria.conf');
        // console.log(path);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex gap-2 self-start ml-2'>
                    <Icons.plus></Icons.plus>
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add 2 Task</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <Input
                        type='text'
                        onChange={e => setUrl(e.target.value)}
                        value={url}
                        placeholder='Enter URL'
                    />
                </div>
                <DialogFooter>
                    <Button type='submit' onClick={handleSubmit}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddDownloadForm;
