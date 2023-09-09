'use client';

import { appWindow } from '@tauri-apps/api/window';
import { useState } from 'react';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const controlButtons = [
    {
        name: 'minimize',
        icon: <Icons.minimize />,
    },
    {
        name: 'maximize',
        icon: <Icons.maximize />,
    },
    {
        name: 'close',
        icon: <Icons.close />,
    },
];

export default function WindowBar({ muted }: { muted?: string[] }) {
    const [isMaximized, setIsMaximized] = useState<boolean>(false);

    const handleClick = (name: string) => {
        switch (name) {
            case 'minimize':
                appWindow.minimize();
                break;
            case 'maximize':
                appWindow.toggleMaximize();
                setIsMaximized(!isMaximized);
                break;
            case 'close':
                appWindow.close();
                break;
        }
    };

    appWindow.isMaximized().then(isMaximized => setIsMaximized(isMaximized));

    return (
        <div
            className='h-7 select-none flex left-0 right-0 justify-end gap-[1px] m-2 '
            data-tauri-drag-region
        >
            {controlButtons.map(button => (
                <div
                    key={button.name}
                    className='flex items-center align-middle text-center'
                >
                    <div
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            muted?.includes(button.name) &&
                                'text-gray-500 hover:text-gray-500 bg-transparent hover:bg-transparent'
                        )} // todo)) Need to add bg-red for close button while hovered
                        onClick={() => {
                            muted?.includes(button.name) ||
                                handleClick(button.name);
                        }}
                    >
                        {isMaximized && button.name === 'maximize' ? (
                            <Icons.restore />
                        ) : (
                            button.icon
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
