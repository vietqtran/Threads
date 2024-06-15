import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '@/resources/users/users.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { TokenPayload } from '../interfaces/token-payload'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['Refresh']
        }
      ]),
      secretOrKey: configService.get('jwt.refreshSecret'),
      passReqToCallback: true
    })
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.cookies?.Refresh
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.sub)
  }
}
