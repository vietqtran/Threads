import { BaseEntity } from "@/base/entity.base";
import { User } from "@/resources/users/entities/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

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

  @Prop({ type: MongooseSchema.Types.Array })
  medias?: {
    url: string,
    type: string
  }[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;
}

export type ThreadDocument = Thread & Document
export const ThreadSchema = SchemaFactory.createForClass(Thread)