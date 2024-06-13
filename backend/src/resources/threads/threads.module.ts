import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { Thread, ThreadSchema } from './entities/thread.entity'
import { ThreadsController } from './threads.controller'
import { ThreadsService } from './threads.service'

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService]
})
export class ThreadsModule {}
