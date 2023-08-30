'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { Icons } from '../icons';
import { Button, buttonVariants } from './button';

const sideBarData = [
    {
        name: 'Add',
        icon: <Icons.plus />,
        link: '/add',
    },
    {
        name: 'Home',
        icon: <Icons.home />,
        link: '/',
    },
    {
        name: 'Downloading',
        icon: <Icons.download />,
        link: '/downloading',
    },
    {
        name: 'Downloaded',
        icon: <Icons.check />,
        link: '/downloaded',
    },
];

const SideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
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
                    <Link
                        href={item.link}
                        passHref
                        key={item.name}
                        className={cn(
                            'flex pl-2',
                            buttonVariants({ variant: 'ghost' })
                        )}
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
                    </Link>
                ))}
            </div>
            <Button variant='ghost' className='absolute bottom-3 px-2 w-10'>
                <Icons.settings />
            </Button>
        </nav>
    );
};

export default SideBar;
