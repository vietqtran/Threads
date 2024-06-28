import { BadRequestException, Injectable } from '@nestjs/common'

import { Job } from 'bullmq'
import { MailerService } from '@nestjs-modules/mailer'
import { Processor } from '@nestjs/bullmq'
import { SEND_MAIL } from '../constants/email.constant'
import { WorkerHostProcessor } from '@/modules/bull/processors/worker-host.processor'

@Processor(SEND_MAIL)
@Injectable()
export class SendMailProcessor extends WorkerHostProcessor {
  constructor(private readonly mailerService: MailerService) {
    super()
  }

  async process(job: Job) {
    console.log('processor', job.data)
    switch (job.name) {
      case SEND_MAIL:
        await this.mailerService.sendMail(job.data)
    }
    throw new BadRequestException(`Unknown job name: ${job.name}`)
  }
}
