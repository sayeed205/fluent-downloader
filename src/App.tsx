import { MotionConfig, motion } from 'framer-motion';
import { useState } from 'react';
import './App.css';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WindowBar from '@/components/ui/window-bar';
import { cn } from '@/lib/utils';
import { All, Downloading, Settings } from '@/screens';

const tabs = [
    {
        name: 'Home',
        icon: <Icons.home className='' />,
        screen: <All />,
    },
    {
        name: 'Downloading',
        icon: <Icons.download />,
        screen: <Downloading />,
    },
    {
        name: 'Settings',
        icon: <Icons.settings />,
        screen: <Settings />,
    },
];

function App() {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <main className='w-screen'>
            <WindowBar />
            <MotionConfig transition={{ duration: 0.3 }}>
                <Tabs defaultValue={tabs[0].name} className='flex-row flex'>
                    <TabsList className='flex flex-col h-full bg-transparent gap-1'>
                        <motion.span
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{
                                display: 'flex',
                                gap: '0.5rem',
                                flexDirection: 'row',
                                alignSelf: 'flex-start',
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

                        {tabs.map(tab => (
                            <TabsTrigger
                                key={tab.name}
                                value={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className='py-[7px] px-3'
                            >
                                <motion.span
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        flexDirection: 'row',
                                    }}
                                    animate={{
                                        width: isExpanded ? '285px' : '20px',
                                    }}
                                >
                                    <div className='flex self-start flex-row'>
                                        {tab.icon}
                                    </div>
                                    <motion.div
                                        animate={{
                                            opacity: isExpanded ? 1 : 0,
                                        }}
                                    >
                                        {isExpanded && tab.name}
                                    </motion.div>
                                </motion.span>
                                {activeTab === tab.name && (
                                    <motion.div
                                        layoutId='active-pill'
                                        className='absolute inset-0 rounded-md w-[3px] h-4 bg-foreground top-1/4'
                                        transition={{
                                            type: 'spring',
                                            duration: 0.5,
                                        }}
                                    />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map(tab => (
                        <TabsContent
                            key={tab.name}
                            value={tab.name}
                            className='bg-background rounded-tl-lg w-screen h-screen mt-0'
                        >
                            {tab.screen}
                        </TabsContent>
                    ))}
                </Tabs>
            </MotionConfig>
        </main>
    );
}

export default App;
