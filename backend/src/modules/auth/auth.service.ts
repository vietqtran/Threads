import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PasswordNotMatchException } from '@/common/exceptions/PasswordNotMatch.exception'
import { RegisterDto } from './dto/register.dto'
import { TokenPayload } from './interfaces/token-payload'
import { UserExistedException } from '@/common/exceptions/UserExisted.exception'
import { UsersService } from '../users/users.service'
import { InvalidFieldException } from '@/common/exceptions/InvalidFieldException'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private getAuthCredentialField(credential: string, isRegister = false) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if (emailRegex.test(credential)) {
      return { email: credential }
    }
    if (phoneRegex.test(credential)) {
      return { phoneNumber: credential }
    }
    if (isRegister) {
      throw new InvalidFieldException('Invalid email or phone number')
    }
    return { username: credential }
  }

  async getAuthenticatedUser(credential: string, password: string) {
    const user = await this.usersService.getUserForLogin(
      this.getAuthCredentialField(credential)
    )
    if (!(await this.isMatched(password, user.hashedPassword))) {
      throw new PasswordNotMatchException()
    }
    user.hashedPassword = undefined
    return user
  }

  async register(registerDto: RegisterDto) {
    const credential = this.getAuthCredentialField(registerDto.credential, true)
    const existingUser = await this.usersService.findOneWithoutException({
      $or: [{ username: registerDto.username }, { ...credential }]
    })
    if (existingUser) {
      throw new UserExistedException()
    }
    const hashedPassword = await this.hashPassword(registerDto.password)
    return this.usersService.create({
      username: registerDto.username,
      name: registerDto.name,
      hashedPassword,
      ...credential
    })
  }

  async getCookieWithJwtAccessToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload)
    const maxAge = this.configService.get('jwt.accessExpiresIn')
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=None; Secure`
  }

  async getCookieWithJwtRefreshToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn: `${this.configService.get('jwt.refreshExpiresIn')}s`
    })
    const maxAge = this.configService.get('jwt.refreshExpiresIn')
    return {
      cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=None; Secure`,
      token
    }
  }

  getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ]
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  private async isMatched(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
