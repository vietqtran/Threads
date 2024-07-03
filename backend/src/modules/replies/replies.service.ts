import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ThreadsService } from '../threads/threads.service'
import { UsersService } from '../users/users.service'
import { CreateReplyDto } from './dto/create-reply.dto'
import { UpdateReplyDto } from './dto/update-reply.dto'
import { Reply, ReplyDocument } from './entities/reply.entity'
import { LikeReplyDto } from './dto/like-reply.dto'

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
    private readonly threadsService: ThreadsService,
    private readonly usersService: UsersService
  ) {}

  async create(createReplyDto: CreateReplyDto) {
    this.threadsService.validateMedias(createReplyDto.medias)
    await this.validateUser(createReplyDto.user)
    const thread = await this.threadsService.findOne(createReplyDto.repliedTo)

    const reply = await this.replyModel.create(createReplyDto)
    thread.replies.push(reply)
    await thread.save()
    return reply
  }

  async findAll() {
    return this.replyModel.find().populate('user')
  }

  async findOne(id: string) {
    const reply = await this.replyModel.findById(id).populate('user')
    if (!reply) {
      throw new HttpException('Reply not found', 404)
    }
    return reply
  }

  async update(id: string, updateReplyDto: UpdateReplyDto) {
    this.threadsService.validateMedias(updateReplyDto.medias)
    const reply = await this.replyModel.findByIdAndUpdate(id, updateReplyDto, {
      new: true
    })
    if (!reply) {
      throw new HttpException('Reply not found', 404)
    }
    return reply
  }

  async remove(id: string) {
    const reply = await this.findOne(id)
    const thread = await this.threadsService.findOne(reply.repliedTo)
    thread.replies = thread.replies.filter((r) => r._id.toString() !== id)
    await thread.save()
    return this.replyModel.findByIdAndDelete(id)
  }

  async toggleLikeReply(likeReplyDto: LikeReplyDto) {
    const reply = await this.findOne(likeReplyDto.replyId)
    const userIndex = reply.likedUsers.findIndex(
      (user) => user._id.toString() === likeReplyDto.userId
    )

    if (userIndex !== -1) {
      reply.likedUsers.splice(userIndex, 1)
    } else {
      const user = await this.validateUser(likeReplyDto.userId)
      reply.likedUsers.push(user)
    }

    return reply.save()
  }

  private async validateUser(userId: string) {
    const user = await this.usersService.findOne({ _id: userId })
    if (!user) {
      throw new HttpException('User not found', 404)
    }
    return user
  }
}
