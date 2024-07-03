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
    transform: (email: string) => {
      email?.trim().toLowerCase()
    },
    validate: {
      validator: (email: string) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return emailRegex.test(email)
      },
      message: 'Invalid email'
    }
  })
  email?: string

  @Prop({
    required: false,
    default: null,
    transform: (phone: string) => {
      phone?.trim()
    },
    validate: {
      validator: (phone: string) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        return phoneRegex.test(phone)
      },
      message: 'Invalid phone number'
    }
  })
  phoneNumber?: string

  @Prop({ required: true, select: false, transform: (password: string) => password.trim() })
  hashedPassword: string

  @Prop({ required: false, default: null, select: false, transform: (hashedRefreshToken: string) => hashedRefreshToken?.trim() })
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
