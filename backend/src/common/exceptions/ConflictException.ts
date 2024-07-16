import { ExceptionType } from '@/enums/exception.enum'
import { HttpException, HttpStatus } from '@nestjs/common'

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
    this.name = ExceptionType.CONFLICT
  }
}
