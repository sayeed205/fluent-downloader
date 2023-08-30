'use client';

import { appWindow } from '@tauri-apps/api/window';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDark, setIsDark] = React.useState<boolean>(false);

    appWindow
        .onThemeChanged(({ payload: theme }) => {
            console.log('New theme: ' + theme);
            setIsDark(theme === 'dark');
        })
        .then(res => res());

    console.log('isDark', isDark);
    return (
        <div className={cn(isDark ? 'text-foreground' : 'text-foreground')}>
            {children}
        </div>
    );
};

export { ThemeProvider };
