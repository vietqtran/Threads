import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty({
    description: 'Max length: 25',
    example: 'vietqtran'
  })
  username?: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'vietqtran@gmail.com'
  })
  email?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678'
  })
  hashedPassword?: string

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://github.com/vietqtran'
  })
  avatar?: string
}
