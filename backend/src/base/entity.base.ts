import { ObjectId } from 'mongoose'
import { Prop } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'

export class BaseEntity {
  @Transform(({ value }) => value.toString())
  _id?: ObjectId

  @Prop({ default: null })
  deletedAt: Date
}
