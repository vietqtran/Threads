import { ApiTags } from '@nestjs/swagger'
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
import { LoginDto } from './dto/login.dto'
import JwtAuthGuard from './guards/jwt-auth.guard'
import { Public } from '@/common/decorators/public.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Res() response: Response, @Body() loginDto: LoginDto) {
    const user = await this.authService.getAuthenticatedUser(
      loginDto.email,
      loginDto.password
    )
    const cookie = await this.authService.getCookieWithJwtToken({
      sub: user._id + '',
      email: user.email,
      username: user.username,
      provider: 'email'
    })
    response.setHeader('Set-Cookie', cookie)
    user.hashedPassword = undefined
    return response.send(user)
  }

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.authService.register(registerDto)
    const cookie = await this.authService.getCookieWithJwtToken({
      sub: user._id + '',
      email: user.email,
      username: user.username,
      provider: 'email'
    })
    response.setHeader('Set-Cookie', cookie)
    user.hashedPassword = undefined
    return response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut())
    user.hashedPassword = undefined
    return response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('authenticate')
  currentUser(@Req() request: RequestWithUser) {
    const { user } = request
    console.log(user)
    user.hashedPassword = undefined
    return user
  }
}
