import { User } from "@/resources/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
}
