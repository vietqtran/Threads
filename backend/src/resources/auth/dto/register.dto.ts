import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({
    example: 'vietqtran@example.com'
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: 'password'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({
    example: 'vietqtran'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  username: string
}
