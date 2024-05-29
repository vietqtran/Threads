import { ExceptionType } from '@/enums/exception.enum'
import { HttpException } from '@nestjs/common'

export class PasswordNotMatchException extends HttpException {
  constructor() {
    super('Password is not match', 400)
    this.name = ExceptionType.PASSWORD_NOT_MATCH
  }
}
