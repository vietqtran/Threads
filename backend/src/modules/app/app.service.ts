import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailserService: MailerService
  ) {}
  async getHello() {
    await this.mailserService.sendMail({
      to: 'viettqhe170367@fpt.edu.vn',
      from: this.configService.get<string>('mailer.from'),
      subject: 'Hello',
      template: './welcome',
      context: {
        name: 'Viet'
      }
    })
    return 'Hello World!'
  }
}
