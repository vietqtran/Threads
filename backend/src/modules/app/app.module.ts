import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '../common/config/config.module'
import { MailerModule } from '../common/mailer/mailer.module'
import { MongooseModule } from '../common/mongoose/mongoose.module'
import { RepliesModule } from '../replies/replies.module'
import { ThreadsModule } from '../threads/threads.module'
import { UsersModule } from '../users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule, MongooseModule, MailerModule, UsersModule, AuthModule, ThreadsModule, RepliesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
