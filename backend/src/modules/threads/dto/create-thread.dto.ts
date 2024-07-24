import { User } from '@/modules/users/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString
} from 'class-validator'
import { MediaType } from '../constants/media-type.enum'
import { ThreadContentType, ThreadType } from '../constants/thread-type.enum'
import { Poll } from '../entities/thread.entity'

export class CreateThreadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user: string

    @ApiProperty({
        example: 'Thread 1'
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
        example: {
            id: 'id',
            title: 'title',
            options: [
                {
                    id: 'id',
                    title: 'title',
                    rates: 0
                }
            ]
        }
    })
    @IsObject()
    @IsOptional()
    poll?: Poll

    @ApiProperty({
        example: []
    })
    @IsArray()
    @IsOptional()
    likedUsers?: User[]
}

export class Media {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    url: string

    @ApiProperty({
        enum: MediaType
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(MediaType)
    type: MediaType
}
