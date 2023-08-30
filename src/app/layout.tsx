import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

// import WindowBar from '@/components/ui/window-bar';
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
                    'h-screen max-h-screen overflow-hidden rounded-3xl'
                )}
            >
                <WindowBar />
                {children}
            </body>
        </html>
    );
}
