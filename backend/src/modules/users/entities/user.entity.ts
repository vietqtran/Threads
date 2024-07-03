import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { BaseEntity } from '@/base/entity.base'

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
})
export class User extends BaseEntity {
  @Prop({ required: true, unique: true, transform: (username: string) => username.trim() })
  username: string

  @Prop({
    required: false,
    default: null,
    transform: (email: string) => email?.trim().toLowerCase()
  })
  email?: string

  @Prop({
    required: false,
    default: null,
    transform: (phone: string) => phone?.trim()
  })
  phoneNumber?: string

  @Prop({ required: true, select: false, transform: (password: string) => password.trim() })
  hashedPassword: string

  @Prop({
    required: false,
    default: null,
    select: false,
    transform: (hashedRefreshToken: string) => hashedRefreshToken?.trim()
  })
  hashedRefreshToken?: string

  @Prop({
    default: 'default',
    enum: ['default', 'google', 'facebook'],
    transform: (provider: string) => provider.trim()
  })
  provider?: string

  @Prop({ required: false, default: null, transform: (avatar: string) => avatar?.trim() })
  avatar?: string

  @Prop({ required: false, default: [] })
  following: {
    user: User
    isAccepted: boolean
  }[]
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
