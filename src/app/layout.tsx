'use client';

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import SideBar from '@/components/ui/side-bar';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const WindowBar = dynamic(() => import('@/components/ui/window-bar'), {
    ssr: false,
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Fluent Downloader',
    description: 'A simple download manager for Windows 11',
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang='en'>
            <head />
            <body
                className={cn(
                    inter.className,
                    'h-screen max-h-screen overflow-hidden text-foreground'
                )}
            >
                <WindowBar />
                <div className='flex min-h-screen flex-row pt-4 '>
                    <SideBar />
                    <div className='bg-white/5 rounded-tl-lg w-screen h-[calc(100vh-1rem)]'>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
