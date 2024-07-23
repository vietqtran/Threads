import { User } from '@/modules/users/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'credential'
    })
  }
  async validate(credential: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(credential, password)
  }
}
