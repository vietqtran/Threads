import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { AcceptFollowDto, FollowUserDto } from './dto/follow-user'
import { Public } from '@/common/decorators/public.decorator'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  async findAll() {
    const users = await this.usersService.findAll()
    return users
  }

  @Get(':username')
  @Public()
  async getProfile(@Param('username') username: string) {
    const user = await this.usersService.findOne({username})
    return user
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
          name: "Tràn Quoc Viet",
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

  @Post('/follow')
  async follow(@Body() followUserDto: FollowUserDto) {
    const user = await this.usersService.toggleFollowUser(followUserDto)
    return user
  }

  @Post('/accept-follow')
  async acceptFollow(@Body() acceptFollowDto: AcceptFollowDto) {
    const user = await this.usersService.acceptFollow(acceptFollowDto)
    return user
  }

  @Get('/following/:id')
  async getFollowingUsers(@Param('id') id: string) {
    const users = await this.usersService.getFollowingUsers(id)
    return users
  }
}
