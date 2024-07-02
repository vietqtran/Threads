import * as bcrypt from 'bcrypt'

import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PasswordNotMatchException } from '@/common/exceptions/PasswordNotMatch.exception'
import { RegisterDto } from './dto/register.dto'
import { TokenPayload } from './interfaces/token-payload'
import { UserExistedException } from '@/common/exceptions/UserExisted.exception'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.usersService.getUserForLogin({ email })
    const isPasswordMatching = await this.isMatched(password, user.hashedPassword)
    if (!isPasswordMatching) {
      throw new PasswordNotMatchException()
    }
    user.hashedPassword = undefined
    return user
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto
    const user = await this.usersService.findOneWithoutException({ email })
    if (user) {
      throw new UserExistedException()
    }
    const hashedPassword = await this.hashPassword(password)
    const createdUser = await this.usersService.create({
      username,
      email,
      hashedPassword
    })
    return createdUser
  }

  async getCookieWithJwtAccessToken(payload: TokenPayload) {
    return `Authentication=${await this.jwtService.signAsync(payload)}; HttpOnly; Path=/; Max-Age=${this.configService.get('jwt.accessExpiresIn')}; SameSite=None; Secure`
  }

  async getCookieWithJwtRefreshToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn: `${this.configService.get('jwt.refreshExpiresIn')}s`
    })
    return {
      cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('jwt.refreshExpiresIn')}; SameSite=None; Secure`,
      token
    }
  }

  getCookieForLogOut() {
    return ['Authentication=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0']
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }

  async isMatched(password: string, hash: string): Promise<boolean> {
    const check = await bcrypt.compare(password, hash)
    if (check) return true
    return false
  }
}
