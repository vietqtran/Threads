import * as Joi from 'joi'

import { ConfigModule, ConfigService } from '@nestjs/config'

import configs from '@/configs'
import { PasswordService } from '@/resources/password/password.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'
import { ThreadsModule } from '../threads/threads.module'
import { UsersModule } from '../users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RepliesModule } from '../replies/replies.module'
import { MailerModule } from '../mailer/mailer.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_NAME: Joi.string().optional(),
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().required()
      }),
      load: [...configs],
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
        dbName: configService.get<string>('database.dbName')
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule,
    ThreadsModule,
    RepliesModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService]
})
export class AppModule {}
