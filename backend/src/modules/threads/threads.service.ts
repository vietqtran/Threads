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
        this.validateMedias(createThreadDto.medias)
        return this.threadModel.create(createThreadDto)
    }

    async findAll() {
        return this.threadModel.find().populate('user')
    }

    async findByUser(user: string) {
        return this.threadModel.find({ user }).populate('user')
    }

    async findBySearchTerm(searchTerm: string) {
        return this.threadModel.find({
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
        this.validateMedias(updateThreadDto.medias)
        const thread = await this.threadModel.findByIdAndUpdate(id, updateThreadDto, { new: true })
        if (!thread) {
            throw new HttpException('Thread not found', 404)
        }
        return thread
    }

    async remove(id: string) {
        return this.threadModel.findByIdAndDelete(id)
    }

    async toggleLikeThread(likeThreadDto: LikeThreadDto) {
        const thread = await this.findOne(likeThreadDto.threadId)
        const userIndex = thread.likedUsers.findIndex((user) => user._id.toString() === likeThreadDto.userId)

        if (userIndex !== -1) {
            thread.likedUsers.splice(userIndex, 1)
        } else {
            const user = await this.usersService.findOne({
                _id: likeThreadDto.userId
            })
            if (!user) {
                throw new HttpException('User not found', 404)
            }
            thread.likedUsers.push(user)
        }

        return thread.save()
    }

    validateMedias(medias: Media[]) {
        if (medias && medias.length > 0) {
            const validTypes = ['image', 'video', 'audio']
            const isValid = medias.every((media) => validTypes.includes(media.type))
            if (!isValid) {
                throw new HttpException('Invalid media type', 400)
            }
        }
    }
}
