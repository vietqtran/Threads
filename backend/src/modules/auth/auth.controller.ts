import { Public } from '@/common/decorators/public.decorator'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import JwtRefreshGuard from './guards/jwt-refresh-token.guard'
import LocalAuthGuard from './guards/local.guard'
import RequestWithUser from './interfaces/request-with-user.interface'
import { TokenPayload } from './interfaces/token-payload'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiBody({
    type: LoginDto,
    examples: {
      user1: {
        value: {
          loginCredential: 'vietqtran@gmail.com',
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
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(payload)
    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(payload)
    await this.usersService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user._id + ''
    )
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie
    ])
    return user
  }

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.authService.register(registerDto)
    return response.send(user)
  }

  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request
    await this.usersService.removeRefreshToken(user._id + '')
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut())
    return response.send(user)
  }

  @Get('authenticate')
  currentUser(@Req() request: RequestWithUser) {
    const { user } = request
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
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(payload)
    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(payload)
    await this.usersService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user._id + ''
    )
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie
    ])
    user.hashedRefreshToken = undefined
    return user
  }
}
