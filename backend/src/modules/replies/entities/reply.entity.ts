import { BaseEntity } from '@/base/entity.base'
import { MediaType } from '@/modules/threads/constants/media-type.enum'
import { ThreadContentType, ThreadType } from '@/modules/threads/constants/thread-type.enum'
import { Thread } from '@/modules/threads/entities/thread.entity'
import { User } from '@/modules/users/entities/user.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose'

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
})
export class Reply extends BaseEntity {
  @Prop({ required: false, default: null })
  repliedTo?: string

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
}

export type ReplyDocument = Reply & Document
export const ReplySchema = SchemaFactory.createForClass(Reply)
