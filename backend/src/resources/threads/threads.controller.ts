import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { ThreadsService } from './threads.service'
import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { ApiTags } from '@nestjs/swagger'
import { LikeThreadDto } from './dto/like-thread.dto'

@ApiTags('Threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto) {
    return await this.threadsService.create(createThreadDto)
  }

  @Get()
  async findAll() {
    return await this.threadsService.findAll()
  }

  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return await this.threadsService.findByUser(userId)
  }

  @Get('search/:searchTerm')
  async getBySearchTerm(@Param('searchTerm') searchTerm: string) {
    return await this.threadsService.findBySeachTerm(searchTerm)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.threadsService.findOne(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
    return await this.threadsService.update(id, updateThreadDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.threadsService.remove(id)
  }

  @Post('/like')
  async likeThread(@Body() likeThreadsto: LikeThreadDto) {
    return await this.threadsService.toggleLikeThread(likeThreadsto)
  }
}
