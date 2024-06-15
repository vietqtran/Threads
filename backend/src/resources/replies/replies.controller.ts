import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateReplyDto } from './dto/create-reply.dto'
import { UpdateReplyDto } from './dto/update-reply.dto'
import { RepliesService } from './replies.service'
import { ApiTags } from '@nestjs/swagger'
import { LikeReplyDto } from './dto/like-reply.dto'

@ApiTags('replies')
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async create(@Body() createReplyDto: CreateReplyDto) {
    return await this.repliesService.create(createReplyDto)
  }

  @Get()
  async findAll() {
    return await this.repliesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.repliesService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return await this.repliesService.update(id, updateReplyDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.repliesService.remove(id)
  }

  @Post('/like')
  async likeReply(@Body() likeReplyDto: LikeReplyDto) {
    return await this.repliesService.toggleLikeReply(likeReplyDto)
  }
}
