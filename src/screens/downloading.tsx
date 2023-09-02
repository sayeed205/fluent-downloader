import { Command } from '@tauri-apps/api/shell';

import { Button } from '@/components/ui/button';

const command = Command.sidecar('bin/yt-dlp');

const Downloading = () => {
    const handleCLick = async () => {
        const output = await command.execute();
        console.log(output);
    };

    return (
        <div>
            <h1>Downloading</h1>
            <Button onClick={handleCLick}>click</Button>
        </div>
    );
};

export { Downloading };
