import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { BullModule } from '../bull/bull.module'
import { ConfigModule } from '../config/config.module'
import { MailModule } from '../mail/mail.module'
import { MailerModule } from '../mailer/mailer.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '../mongoose/mongoose.module'
import { QueueModule } from '../queue/queue.module'
import { RepliesModule } from '../replies/replies.module'
import { ThreadsModule } from '../threads/threads.module'
import { UploadModule } from '../upload/upload.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    ConfigModule,
    MongooseModule,
    BullModule,
    QueueModule,
    MailerModule,
    MailModule,
    UploadModule,
    //
    AuthModule,
    ThreadsModule,
    UsersModule,
    RepliesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
