import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LikeThreadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    threadId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string
}
