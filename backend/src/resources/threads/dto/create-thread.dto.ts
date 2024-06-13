import { User } from '@/resources/users/entities/user.entity';
import { ThreadContentType, ThreadType } from './../constants/thread-type.enum';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";

export class CreateThreadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string

  @ApiProperty({
    example: 'Thread 1',
  })
  @IsString()
  content: string

  @ApiProperty({
    enum: ThreadType,
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
  medias?: {
    url: string
    type: string
  }[]

  @ApiProperty({
    example: []
  })
  @IsArray()
  @IsOptional()
  likedUsers?: User[]
}