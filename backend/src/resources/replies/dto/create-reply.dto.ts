import { ThreadContentType, ThreadType } from '@/resources/threads/constants/thread-type.enum'
import { Media } from '@/resources/threads/dto/create-thread.dto'
import { User } from '@/resources/users/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateReplyDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  repliedTo?: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string

  @ApiProperty({
    example: 'Reply 1'
  })
  @IsString()
  content: string

  @ApiProperty({
    enum: ThreadType
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ThreadType)
  type: ThreadType

  @ApiProperty({
    enum: ThreadContentType
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ThreadContentType)
  contentType: ThreadContentType

  @ApiProperty({
    example: [{ url: 'url', type: 'image' }]
  })
  @IsArray()
  @IsOptional()
  medias?: Media[]

  @ApiProperty({
    example: []
  })
  @IsArray()
  @IsOptional()
  likedUsers?: User[]
}
