import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ThreadContentType, ThreadType } from '../constants/thread-type.enum'
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose'

import { BaseEntity } from '@/base/entity.base'
import { MediaType } from '../constants/media-type.enum'
import { Reply } from '@/modules/replies/entities/reply.entity'
import { Type } from 'class-transformer'
import { User } from '@/modules/users/entities/user.entity'
import { ThreadAudience } from '../constants/thread-audience.enum'

export type Media = {
    url: string
    type: MediaType
}

export type Poll = {
    options: {
        id: string
        title: string
        rates: number
    }[]
}

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
        default: []
    })
    medias?: Media[]

    @Prop({
        type: Object,
        required: function () {
            return this.type === ThreadType.POLL
        },
        default: null
    })
    poll?: Poll

    @Prop({ enum: ThreadType, required: true })
    type: ThreadType

    @Prop({ enum: ThreadContentType, required: true })
    contentType: ThreadContentType

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    user: User

    @Prop({
        type: MongooseSchema.Types.Array,
        required: false,
        ref: User.name,
        default: [],
        items: User
    })
    @Type(() => User)
    likedUsers?: User[]

    @Prop({
        type: MongooseSchema.Types.Array,
        required: false,
        ref: Reply.name,
        default: [],
        items: Reply
    })
    @Type(() => Reply)
    replies?: Reply[]

    @Prop({ enum: ThreadAudience, required: false, default: ThreadAudience.ANYONE })
    audience?: ThreadAudience
}

export type ThreadDocument = Thread & Document
export const ThreadSchema = SchemaFactory.createForClass(Thread)
