import { registerAs } from '@nestjs/config';

export default registerAs(
    'database',
    (): Record<string, any> => ({
        url: process.env?.DATABASE_URL
    })
);