import SideBar from '@/components/sidebar';
import WindowBar from '@/components/ui/window-bar';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <div className=''>
            <WindowBar />
            <div className='flex flex-row'>
                <SideBar />
                <div className='bg-background rounded-tl-lg w-screen h-screen justify-center self-center p-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
