import * as Joi from 'joi'

import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PasswordService } from '@/resources/password/password.service'
import { UsersModule } from '../users/users.module'
import configs from '@/configs'
import { ThreadsModule } from '../threads/threads.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_USERNAME: Joi.string().optional(),
        MONGO_PASSWORD: Joi.string().optional(),
        MONGO_ID: Joi.string().optional(),
        MONGO_CLUSTER_NAME: Joi.string().optional(),
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
    ThreadsModule
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService]
})
export class AppModule {}
