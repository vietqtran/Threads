import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { BaseEntity } from '@/base/entity.base'
import mongoose, { Document } from 'mongoose'
import { Thread } from '@/resources/threads/entities/thread.entity'

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
})
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({
    required: true,
    unique: true,
    transform: (email: string) => email.toLowerCase()
  })
  email: string

  @Prop({ required: true })
  hashedPassword: string

  @Prop({ required: false })
  hashedRefreshToken?: string

  @Prop({ default: 'email' })
  provider?: string

  @Prop({ required: false })
  avatar?: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
