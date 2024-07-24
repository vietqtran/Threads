import { HttpException, HttpStatus } from '@nestjs/common'

import { ExceptionType } from '@/enums/exception.enum'

export class UserNotFoundException extends HttpException {
    constructor() {
        super('User not found', HttpStatus.NOT_FOUND)
        this.name = ExceptionType.USER_NOT_FOUND
    }
}
