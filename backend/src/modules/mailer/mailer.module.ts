import { ConfigModule, ConfigService } from '@nestjs/config'

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailerModule as NestMailer } from '@nestjs-modules/mailer'
import { join } from 'path'

@Module({
  imports: [
    NestMailer.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mailer.host'),
          secure: false,
          auth: {
            user: configService.get<string>('mailer.user'),
            pass: configService.get<string>('mailer.password')
          }
        },
        defaults: {
          from: configService.get<string>('mailer.from')
        },
        template: {
          dir: join(__dirname, '../../assets/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class MailerModule {}
