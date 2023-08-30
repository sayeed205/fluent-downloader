'use client';

import { appWindow } from '@tauri-apps/api/window';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Icons } from '../icons';
import { buttonVariants } from './button';

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

export default function WindowBar() {
    const [isMaximized, setIsMaximized] = useState<boolean>(false);

    const handleClick = async (name: string) => {
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
            className='h-11 text-background select-none flex left-0 right-0 justify-end'
            data-tauri-drag-region
        >
            {controlButtons.map(button => (
                <div
                    key={button.name}
                    className='flex items-center align-middle text-center'
                >
                    <div
                        className={cn(
                            'w-full h-full px-3',
                            buttonVariants({
                                variant:
                                    button.name === 'close'
                                        ? 'destructive'
                                        : 'ghost',
                            })
                        )}
                        onClick={() => handleClick(button.name)}
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
