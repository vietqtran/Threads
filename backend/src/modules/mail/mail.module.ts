import { MAIL_QUEUE, SEND_MAIL } from './constants/email.constant'

import { MailService } from './mail.service'
import { Module } from '@nestjs/common'
import { QueueModule } from '../queue/queue.module'
import { SendMailProcessor } from './processors/send-mail.processor'

@Module({
  imports: [
    QueueModule.register({
      queues: [SEND_MAIL],
      flows: [MAIL_QUEUE]
    })
  ],
  exports: [MailService],
  providers: [MailService, SendMailProcessor]
})
export class MailModule {}
