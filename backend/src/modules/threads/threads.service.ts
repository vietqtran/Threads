import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UsersService } from '../users/users.service'
import { CreateThreadDto, Media } from './dto/create-thread.dto'
import { LikeThreadDto } from './dto/like-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { Thread, ThreadDocument } from './entities/thread.entity'

@Injectable()
export class ThreadsService {
  constructor(
    @InjectModel(Thread.name)
    private readonly threadModel: Model<ThreadDocument>,
    private readonly usersService: UsersService
  ) {}

  async create(createThreadDto: CreateThreadDto) {
    if (!this.isValidMedias(createThreadDto.medias)) {
      throw new HttpException('Invalid media type', 400)
    }
    return await this.threadModel.create(createThreadDto)
  }

  async findAll() {
    return await this.threadModel.find().populate('user')
  }

  async findByUser(user: string) {
    return await this.threadModel.find({ user }).populate('user')
  }

  async findBySeachTerm(searchTerm: string) {
    return await this.threadModel.find({
      content: { $regex: searchTerm, $options: 'i' }
    })
  }

  async findOne(id: string) {
    const thread = await this.threadModel.findById(id).populate('user')
    if (!thread) {
      throw new HttpException('Thread not found', 404)
    }
    return thread
  }

  async update(id: string, updateThreadDto: UpdateThreadDto) {
    if (!this.isValidMedias(updateThreadDto.medias)) {
      throw new HttpException('Invalid media type', 400)
    }
    const thread = await this.threadModel.findById(id)
    if (!thread) {
      throw new HttpException('Thread not found', 404)
    }
    return await this.threadModel.findByIdAndUpdate(id, updateThreadDto)
  }

  async remove(id: string) {
    return await this.threadModel.findByIdAndDelete(id)
  }

  async toggleLikeThread(likeThreadDto: LikeThreadDto) {
    const thread = await this.threadModel.findById(likeThreadDto.threadId)
    if (!thread) {
      throw new HttpException('Thread not found', 404)
    }
    const isUserLikedThread = thread.likedUsers.some(
      (user) => user._id.toString() === likeThreadDto.userId
    )
    if (isUserLikedThread) {
      thread.likedUsers = thread.likedUsers.filter(
        (user) => user._id.toString() !== likeThreadDto.userId
      )
    } else {
      const user = await this.usersService.findOne({
        _id: likeThreadDto.userId
      })
      if (!user) {
        throw new HttpException('User not found', 404)
      }
      thread.likedUsers.push(user)
    }
    return await thread.save()
  }

  public isValidMedias(medias: Media[]) {
    if (medias && medias.length > 0) {
      const validMedias = medias.some((media) => {
        return !['image', 'video', 'audio'].includes(media.type)
      })
      if (validMedias) {
        return false
      }
    }
    return true
  }
}
