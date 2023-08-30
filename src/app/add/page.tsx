'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { invoke } from '@tauri-apps/api/tauri';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { urlSchema } from '@/lib/validations/url';

type FormData = z.infer<typeof urlSchema>;

export default function AddDownload() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(urlSchema),
    });

    const onSubmit = async (data: FormData) => {
        await invoke('add_download', { url: data.url });

        router.push('/downloading');
    };

    return (
        <main className='flex items-center justify-center align-middle'>
            <div className='flex'>
                <div className=''>
                    <Input
                        id='url'
                        placeholder='Enter url'
                        type='text'
                        autoCapitalize='none'
                        autoComplete='off'
                        autoCorrect='off'
                        {...register('url')}
                    />
                    {errors?.url && (
                        <p className='px-1 text-xs text-red-600'>
                            {errors.url.message}
                        </p>
                    )}
                </div>

                <Button className='flex px-2' onClick={handleSubmit(onSubmit)}>
                    <Icons.plus />
                    Add
                </Button>
            </div>
        </main>
    );
}
