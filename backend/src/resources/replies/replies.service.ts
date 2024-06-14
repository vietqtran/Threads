import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ThreadsService } from '../threads/threads.service'
import { UsersService } from '../users/users.service'
import { CreateReplyDto } from './dto/create-reply.dto'
import { UpdateReplyDto } from './dto/update-reply.dto'
import { Reply, ReplyDocument } from './entities/reply.entity'

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
    private readonly threadsService: ThreadsService,
    private readonly usersService: UsersService
  ) {}

  async create(createReplyDto: CreateReplyDto) {
    if (!this.threadsService.isValidMedias(createReplyDto.medias)) {
      throw new HttpException('Invalid media type', 400)
    }
    const user = await this.usersService.findOne({ _id: createReplyDto.user })
    if (!user) {
      throw new HttpException('User not found', 404)
    }
    const thread = await this.threadsService.findOne(createReplyDto.repliedTo)
    if (!thread) {
      throw new HttpException('Thread not found', 404)
    }
    const reply = await this.replyModel.create(createReplyDto)
    thread.replies.push(reply)
    await thread.save()
    return reply
  }

  async findAll() {
    return await this.replyModel.find().populate('user')
  }

  async findOne(id: string) {
    const reply = await this.replyModel.findById(id).populate('user')
    if (!reply) {
      throw new HttpException('Reply not found', 404)
    }
    return reply
  }

  async update(id: string, updateReplyDto: UpdateReplyDto) {
    if (!this.threadsService.isValidMedias(updateReplyDto.medias)) {
      throw new HttpException('Invalid media type', 400)
    }
    const reply = await this.replyModel.findById(id)
    if (!reply) {
      throw new HttpException('Reply not found', 404)
    }
    return await this.replyModel.findByIdAndUpdate(id, updateReplyDto, { new: true })
  }

  async remove(id: string) {
    const reply = await this.replyModel.findById(id)
    if (!reply) {
      throw new HttpException('Reply not found', 404)
    }
    const thread = await this.threadsService.findOne(reply.repliedTo)
    thread.replies = thread.replies.filter((reply) => reply._id.toString() !== id)
    await thread.save()
    return await this.replyModel.findByIdAndDelete(id)
  }
}

