import { downloadDir } from '@tauri-apps/api/path';
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
import aria2 from '@/lib/aria2';
import { Icons } from './icons';

const AddDownloadForm = () => {
    const [url, setUrl] = useState('');
    const handleSubmit = async () => {
        const downloadDirPath = await downloadDir();
        aria2.addUri(url, {
            dir: downloadDirPath,
        });

        console.log(downloadDirPath);
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
