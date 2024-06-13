import { Module } from '@nestjs/common'
import { ThreadsService } from './threads.service'
import { ThreadsController } from './threads.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Thread, ThreadSchema } from './entities/thread.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService]
})
export class ThreadsModule {}
