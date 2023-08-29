'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const sideBarData = [
    {
        name: 'Home',
        icon: <Icons.home />,
    },
    {
        name: 'Downloading',
        icon: <Icons.download />,
    },
    {
        name: 'Downloaded',
        icon: <Icons.check />,
    },
];

export default function Home() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <main className='flex min-h-screen flex-row pt-4 text-background'>
            <nav
                className={`${
                    isOpen ? 'w-96' : 'w-12'
                } flex flex-col pt-3 ease-in-out duration-300 transition-all`}
            >
                <div className='flex flex-col'>
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className='pl-2 w-9 items-center flex'
                        variant='ghost'
                    >
                        <Icons.menu />
                    </Button>
                    {sideBarData.map(item => (
                        <Button
                            className={cn('flex pl-2 ')}
                            variant='ghost'
                            key={item.name}
                        >
                            {item.icon}
                            <span
                                className={`${
                                    isOpen
                                        ? 'opacity-100 w-full '
                                        : 'w-0 opacity-0 '
                                } ease-in-out duration-300 transition-all text-left pl-3`}
                            >
                                {item.name}
                            </span>
                        </Button>
                    ))}
                </div>
                <Button variant='ghost' className='absolute bottom-3 px-2 w-10'>
                    <Icons.settings />
                </Button>
            </nav>

            <div className='bg-white/5 rounded-tl-lg w-screen h-[calc(100vh-1rem)]'>
                <Button variant='ghost' className='pl-2 w-9 items-center flex'>
                    Hello
                </Button>
            </div>
        </main>
    );
}
