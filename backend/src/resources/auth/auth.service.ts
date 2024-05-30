import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PasswordService } from '@/resources/password/password.service'
import { RegisterDto } from './dto/register.dto'
import { TokenPayload } from './interfaces/token-payload'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email })
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST
      )
    }
    const isPasswordMatching = await this.passwordService.isMatched(
      password,
      user.hashedPassword
    )
    if (!isPasswordMatching) {
      throw new HttpException('Password is not correct', HttpStatus.BAD_REQUEST)
    }
    return user
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto
    const user = await this.usersService.findOne({ email })
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    const hashedPassword = await this.passwordService.hashPassword(password)
    const createdUser = await this.usersService.create({
      username,
      email,
      hashedPassword
    })
    return createdUser
  }

  async getCookieWithJwtAccessToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('jwt.accessExpiresIn')}; SameSite=None; Secure`
  }

  async getCookieWithJwtRefreshToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn: `${this.configService.get('jwt.refreshExpiresIn')}s`
    })
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('jwt.refreshExpiresIn')}; SameSite=None; Secure`
    return {
      cookie,
      token
    }
  }

  getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ]
  }
}
