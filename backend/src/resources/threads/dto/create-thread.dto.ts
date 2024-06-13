import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    example: [{ url: 'url', type: 'image' }]
  })
  @IsArray()
  @IsOptional()
  medias?: {
    url: string
    type: string
  }[]
}