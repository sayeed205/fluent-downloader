import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={inter.className}>{children}</body>
        </html>
    );
}
