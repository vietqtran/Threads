import { Prop } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'
import { ObjectId } from 'mongoose'

export class BaseEntity {
  @Transform(({ value }) => value.toString())
  _id?: ObjectId

  @Prop({ default: null, select: false })
  deletedAt: Date
}
