import { BaseEntity } from '@/base/entity.base'
import { User } from '@/resources/users/entities/user.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose'
import { MediaType } from '../constants/media-type.enum'
import { ThreadContentType, ThreadType } from '../constants/thread-type.enum'
import { Reply } from '@/resources/replies/entities/reply.entity'

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
})
export class Thread extends BaseEntity {
  @Prop({ required: false })
  content?: string

  @Prop({
    type: MongooseSchema.Types.Array,
    required: false,
    default: [],
    items: {
      url: String,
      type: MediaType
    }
  })
  medias?: {
    url: string
    type: MediaType
  }[]

  @Prop({ enum: ThreadType, required: true })
  type: ThreadType

  @Prop({ enum: ThreadContentType, required: true })
  contentType: ThreadContentType

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User

  @Prop({ type: MongooseSchema.Types.Array, required: false, ref: User.name, default: [], items: User })
  @Type(() => User)
  likedUsers?: User[]

  @Prop({ type: MongooseSchema.Types.Array, required: false, ref: Reply.name, default: [], items: Reply })
  @Type(() => Reply)
  replies?: Reply[]
}

export type ThreadDocument = Thread & Document
export const ThreadSchema = SchemaFactory.createForClass(Thread)
