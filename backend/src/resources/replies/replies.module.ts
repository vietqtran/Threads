import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ThreadsModule } from '../threads/threads.module'
import { UsersModule } from '../users/users.module'
import { Reply, ReplySchema } from './entities/reply.entity'
import { RepliesController } from './replies.controller'
import { RepliesService } from './replies.service'

@Module({
  imports: [UsersModule, ThreadsModule, MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }])],
  controllers: [RepliesController],
  providers: [RepliesService],
  exports: [RepliesService]
})
export class RepliesModule {}
