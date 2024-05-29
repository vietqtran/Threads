import { Injectable } from '@nestjs/common'
import { PasswordService } from '@/services/password/password.service'

@Injectable()
export class AuthService {
  constructor(private readonly passwordService: PasswordService) {}
}
