import * as z from 'zod';

export const urlSchema = z.object({ url: z.string().url() });
