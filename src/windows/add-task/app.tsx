import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import WindowBar from '@/components/ui/window-bar';
import aria2 from '@/lib/aria2';
import { downloadDir } from '@tauri-apps/api/path';
import { WebviewWindow } from '@tauri-apps/api/window';
import { useState } from 'react';

const AddTask = () => {
    const [url, setUrl] = useState<string>('');

    const handleAddTask = async () => {
        const dir = await downloadDir();
        await aria2.addUri([url], { dir: dir.toString() });
        await WebviewWindow.getByLabel('new_task')?.close();
    };

    return (
        <>
            <WindowBar muted={['maximize']} />
            <div className='flex flex-col gap-2 justify-center items-center align-middle mt-20'>
                <Input
                    type='text'
                    className='w-[calc(100%-300px)] focus:outline-none focus-visible:outline-none active:outline-none'
                    placeholder='Enter URL'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <Button onClick={handleAddTask}>Add</Button>
            </div>
        </>
    );
};

export default AddTask;
