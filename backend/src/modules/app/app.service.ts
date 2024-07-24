import { Injectable } from '@nestjs/common'
import { MailService } from '../mail/mail.service'

@Injectable()
export class AppService {
    constructor(private readonly mailService: MailService) {}

    async getHello() {
        console.log('controller')
        await this.mailService.sendMail({
            to: 'elyssatan2008@gmail.com',
            context: {
                name: 'Viet dep trai'
            },
            subject: 'Welcome to Threads',
            template: 'welcome'
        })
        return 'Hello World!'
    }
}
