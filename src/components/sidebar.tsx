import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Icons } from './icons';
import { buttonVariants } from './ui/button';

export default function SideBar() {
    const pages = [
        {
            name: 'Home',
            Icon: Icons.home,
            href: '/',
        },
        {
            name: 'Downloading',
            Icon: Icons.download,
            href: '/downloading',
        },
        {
            name: 'Downloaded',
            Icon: Icons.check,
            href: '/downloaded',
        },
        {
            name: 'Settings',
            Icon: Icons.settings,
            href: '/settings',
        },
        {
            name: 'YTDLP',
            Icon: Icons.youtube,
            href: '/ytdl',
        },
    ];

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const location = useLocation();

    return (
        <nav>
            <ul className='flex flex-col h-full bg-transparent gap-1'>
                <motion.span
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        display: 'flex',
                        gap: '4px',
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        margin: '10px',
                    }}
                    whileTap={{
                        scale: '0.9',
                    }}
                    className={cn(
                        buttonVariants({
                            variant: 'ghost',
                            size: 'icon',
                        })
                    )}
                >
                    <Icons.menu />
                </motion.span>
                {pages.map(page => (
                    <li
                        key={page.name}
                        className={cn(
                            'px-1',
                            page.name === 'Settings' && 'absolute bottom-4'
                        )}
                    >
                        <motion.div
                            className={cn(
                                location.pathname === page.href &&
                                    'bg-background',
                                'rounded-lg'
                            )}
                            animate={{
                                width: isExpanded ? '285px' : '50px',
                            }}
                        >
                            <NavLink
                                to={page.href}
                                // <div
                                className={cn(
                                    'hover:bg-background hover:text-foreground relative py-[6px] px-1 flex items-center text-center rounded-lg transition-all duration-300 gap-3',
                                    'pl-[14px]',
                                    isExpanded && 'w-[285px]'
                                )}
                            >
                                <page.Icon />
                                <motion.div
                                    animate={{
                                        opacity: isExpanded ? 1 : 0,
                                    }}
                                >
                                    {
                                        // invisible character to keep the layout. Shit hack but works
                                        !isExpanded && '‎'
                                    }
                                    {isExpanded && page.name}
                                </motion.div>
                                {location.pathname === page.href && (
                                    <motion.div
                                        layoutId='active-pill'
                                        className='absolute inset-0 rounded-md w-[3px] h-4 bg-foreground top-[calc(25%+1px)]'
                                        transition={{
                                            type: 'spring',
                                            duration: 0.5,
                                        }}
                                    />
                                )}
                                {/* </div> */}
                            </NavLink>
                        </motion.div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
