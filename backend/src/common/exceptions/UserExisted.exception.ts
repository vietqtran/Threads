import { HttpException, HttpStatus } from '@nestjs/common'

import { ExceptionType } from '@/enums/exception.enum'

export class UserExistedException extends HttpException {
    constructor() {
        super('User Existed', HttpStatus.BAD_REQUEST)
        this.name = ExceptionType.USER_EXISTS
    }
}
