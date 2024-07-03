import { registerAs } from '@nestjs/config'

export default registerAs(
  'database',
  (): Record<string, string> => ({
    url: process.env?.DATABASE_URL,
    dbName: process.env?.DATABASE_NAME
  })
)
