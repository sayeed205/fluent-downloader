'use client';

import { useState } from 'react';
import { Icons } from '../icons';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={`ease-in-out duration-300 ${isOpen ? 'w-24' : 'w-12'}`}>
            <div className='flex flex-col pl-3 gap-3 pt-4'>
                <div className=''>
                    <Icons.menu onClick={() => setIsOpen(!isOpen)} />
                </div>
                <div className=''>
                    <Icons.home />
                </div>
                <div className=''>
                    <Icons.download />
                </div>
            </div>
            <div className='absolute bottom-3'>
                <Icons.settings />
            </div>
        </div>
    );
};

export default SideBar;
