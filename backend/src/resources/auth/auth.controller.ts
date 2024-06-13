import { Public } from '@/common/decorators/public.decorator'
import MongooseClassSerializerInterceptor from '@/common/interceptors/mongooseClassSerializer.interceptor'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import JwtRefreshGuard from './guards/jwt-refresh-token.guard'
import JwtAuthGuard from './guards/jwt.guard'
import LocalAuthGuard from './guards/local.guard'
import RequestWithUser from './interfaces/request-with-user.interface'
import { TokenPayload } from './interfaces/token-payload'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @ApiBody({
    type: LoginDto,
    examples: {
      user1: {
        value: {
          email: 'vietqtran@gmail.com',
          password: '12345678'
        }
      }
    }
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: RequestWithUser) {
    const { user } = request
    const payload: TokenPayload = {
      email: user.email,
      username: user.username,
      provider: user.provider,
      sub: user._id + ''
    }
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(payload)
    const refreshTokenCookie = await this.authService.getCookieWithJwtRefreshToken(payload)
    await this.usersService.setCurrentRefreshToken(refreshTokenCookie.token, user._id + '')
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie])
    return user
  }

  @Post('register')
  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Public()
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.authService.register(registerDto)
    return response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request
    await this.usersService.removeRefreshToken(user._id + '')
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut())
    return response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('authenticate')
  currentUser(@Req() request: RequestWithUser) {
    const { user } = request
    console.log(user)
    return user
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser) {
    const { user } = request
    const payload: TokenPayload = {
      email: user.email,
      username: user.username,
      provider: user.provider,
      sub: user._id + ''
    }
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(payload)
    const refreshTokenCookie = await this.authService.getCookieWithJwtRefreshToken(payload)
    await this.usersService.setCurrentRefreshToken(refreshTokenCookie.token, user._id + '')
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie])
    return user
  }
}
