import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
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
import { RegisterDto } from './dto/register.dto'
import LocalAuthGuard from './guards/local.guard'
import RequestWithUser from './interfaces/request-with-user.interface'
import { Response } from 'express'
import JwtAuthGuard from './guards/jwt.guard'
import { Public } from '@/common/decorators/public.decorator'
import { TokenPayload } from './interfaces/token-payload'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'
import JwtRefreshGuard from './guards/jwt-refresh-token.guard'

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
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken({
        email: user.email,
        username: user.username,
        provider: user.provider,
        sub: user._id + ''
      })

    request.res.setHeader('Set-Cookie', accessTokenCookie)
    return user
  }
}
