'use client';

import { Button } from '@/components/ui/button';
import { invoke } from '@tauri-apps/api';

export default function Home() {
    const handleCheck = async () => {
        const response = await invoke('check');
        console.log(response);
    };

    return (
        <main className=''>
            <Button onClick={handleCheck}>Check</Button>
        </main>
    );
}
