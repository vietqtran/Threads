import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { TokenPayload } from '../interfaces/token-payload'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies['Authentication']
                }
            ]),
            secretOrKey: configService.get('jwt.accessSecret')
        })
    }

    async validate(payload: TokenPayload) {
        return await this.userService.findOne({ _id: payload.sub })
    }
}
