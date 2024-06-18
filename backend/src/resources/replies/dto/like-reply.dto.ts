import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LikeReplyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  replyId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string
}
