import { User } from '../user'

export interface Thread {
    id: string
    user: string
    content: string
    type: string
    contentType: string
    medias: Media[]
    poll: Poll
    likedUsers: User[]
    audience: ThreadAudience
}

export interface Media {
    url: string
    type: string
}

export interface Poll {
    options: Option[]
}

export interface Option {
    id: string
    title: string
    rates?: number
}

export interface Reply {
    repliedTo: string
    user: string
    content: string
    type: string
    contentType: string
    medias: Media[]
    likedUsers: User[]
}

export enum ThreadAudience {
    ANYONE = 'anyone',
    MENTIONED = 'mentioned',
    FOLLOWED = 'followed'
}
