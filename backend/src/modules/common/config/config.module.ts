import configs from '@/configs'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_NAME: Joi.string().optional(),
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
        MAILER_HOST: Joi.string().required(),
        MAILER_USER: Joi.string().required(),
        MAILER_PASSWORD: Joi.string().required(),
        MAILER_FROM: Joi.string().required(),
        MAIL_TRANSPORT: Joi.string().required()
      }),
      load: [...configs],
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true
    })
  ]
})
export class ConfigModule {}
