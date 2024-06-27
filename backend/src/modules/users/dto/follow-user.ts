import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class FollowUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isAccepted: boolean
}

export class AcceptFollowDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to: string
}
