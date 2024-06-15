import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return users
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return user
  }

  @Put(':id')
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      user1: {
        value: {
          username: 'vietqtran',
          email: 'vietqtran@gmail.com',
          hashedPassword: '12345678',
          hashedRefreshToken: '',
          avatar: 'https://github.com/vietqtran',
          provider: 'email'
        }
      }
    }
  })
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    const user = await this.usersService.update(id, updateUserDto)
    return user
  }
}
