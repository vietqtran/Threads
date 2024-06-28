import { InjectQueue } from '@nestjs/bullmq'
import { SEND_MAIL } from '../constants/email.constant'

export const InjectSendMailQueue = () => InjectQueue(SEND_MAIL)
