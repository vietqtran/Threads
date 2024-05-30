import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty({
    description: 'Max length: 25',
    example: 'vietqtran'
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'vietqtran@gmail.com'
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678'
  })
  hashedPassword: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: ''
  })
  hashedRefreshToken?: string

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://github.com/vietqtran'
  })
  avatar?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'email'
  })
  provider?: string
}
