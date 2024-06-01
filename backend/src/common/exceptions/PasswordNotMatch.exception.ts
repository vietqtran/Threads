import { HttpException, HttpStatus } from '@nestjs/common'

import { ExceptionType } from '@/enums/exception.enum'

export class PasswordNotMatchException extends HttpException {
  constructor() {
    super('Password is not match', HttpStatus.BAD_REQUEST)
    this.name = ExceptionType.PASSWORD_NOT_MATCH
  }
}
