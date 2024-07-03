import { registerAs } from '@nestjs/config'

export default registerAs(
  'mailer',
  (): Record<string, string> => ({
    host: process.env.MAILER_HOST,
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
    from: process.env.MAILER_FROM,
    transport: process.env.MAILER_TRANSPORT
  })
)
