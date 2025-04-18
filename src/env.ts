import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.string(),
    API_URL: z.string().url(),
  },
  server: {
    API_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_AUTO_CLOSE_TIMEOUT: z.string().transform(Number),
  },
  runtimeEnv: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,

    API_SECRET_KEY: process.env.DATABASE_URL,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTO_CLOSE_TIMEOUT: process.env.NEXT_PUBLIC_AUTO_CLOSE_TIMEOUT,
  },
});
