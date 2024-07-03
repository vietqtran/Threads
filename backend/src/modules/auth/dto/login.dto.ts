import { IsNotEmpty, IsString, MinLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    example: 'vietqtran@example.com'
  })
  @IsString()
  @IsNotEmpty()
  loginCredential: string

  @ApiProperty({
    example: 'password'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string
}
