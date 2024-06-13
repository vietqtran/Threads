import { BaseEntity } from "@/base/entity.base";
import { User } from "@/resources/users/entities/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ThreadContentType, ThreadType } from "../constants/thread-type.enum";

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

  @Prop({ type: MongooseSchema.Types.Array, required: false, default: [], items: { url: String, type: String } })
  medias?: {
    url: string,
    type: string
  }[]

  @Prop({ enum: ThreadType, required: true })
  type: ThreadType

  @Prop({ enum: ThreadContentType, required: true })
  contentType: ThreadContentType

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;

  @Prop({ type: MongooseSchema.Types.Array, required: false, ref: User.name, default: [], items: User })
  @Type(() => User)
  likedUsers?: User[]
}

export type ThreadDocument = Thread & Document
export const ThreadSchema = SchemaFactory.createForClass(Thread)