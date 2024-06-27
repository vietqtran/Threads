import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private readonly mailserService: MailerService) {}
  async getHello() {
    await this.mailserService.sendMail({
      to: 'viettqhe170367@fpt.edu.vn',
      from: 'tranquocviet1303@gmail.com',
      subject: 'Hello',
      template: './welcome',
      context: {
        name: 'Viet'
      }
    })
    return 'Hello World!'
  }
}
