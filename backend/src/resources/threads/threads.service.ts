import { HttpException, Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Model, StringExpression } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Thread, ThreadDocument } from './entities/thread.entity';

@Injectable()
export class ThreadsService {
  constructor(@InjectModel(Thread.name) private readonly threadModel: Model<ThreadDocument>) { }

  async create(createThreadDto: CreateThreadDto) {
    const validMedias = createThreadDto.medias.some(media => {
      return !['image', 'video', 'audio'].includes(media.type)
    })
    if (validMedias) {
      throw new HttpException('Invalid media type', 400)
    }
    return await this.threadModel.create(createThreadDto);
  }

  async findAll() {
    return await this.threadModel.find().populate('user');
  }

  async findByUser(user: string) {
    return await this.threadModel.find({ user }).populate('user');
  }

  async findBySeachTerm(searchTerm: string) {
    return await this.threadModel.find({ content: { $regex: searchTerm, $options: 'i' } }).populate('user');
  }

  async findOne(id: string) {
    const thread = await this.threadModel.findById(id).populate('user');
    if (!thread) {
      throw new HttpException('Thread not found', 404);
    }
    return thread;
  }

  async update(id: string, updateThreadDto: UpdateThreadDto) {
    const thread = await this.threadModel.findById(id);
    if (!thread) {
      throw new HttpException('Thread not found', 404);
    }
    return await this.threadModel.findByIdAndUpdate(id, { ...thread, updateThreadDto }).populate('user');
  }

  async remove(id: string) {
    return await this.threadModel.findByIdAndDelete(id);
  }
}
