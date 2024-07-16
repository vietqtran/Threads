import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({
    example: 'vietqtran@gmail.com'
  })
  @IsString()
  @IsNotEmpty()
  credential: string

  @ApiProperty({
    example: '12345678'
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

  @ApiProperty({
    example: 'Tran Quoc Viet'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string
}
