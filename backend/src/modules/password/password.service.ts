import * as bcrypt from 'bcrypt'

import { Injectable } from '@nestjs/common'

@Injectable()
export class PasswordService {
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
