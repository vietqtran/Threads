import { BaseEntity } from '@/base/entity.base'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from 'mongoose'

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: false })
  avatar?: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
