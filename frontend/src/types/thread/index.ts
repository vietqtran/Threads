import { User } from '../user'

export interface Thread {
    user: string
    content: string
    type: string
    contentType: string
    medias: Media[]
    poll: Poll
    likedUsers: User[]
}

export interface Media {
    url: string
    type: string
}

export interface Poll {
    id: string
    title: string
    options: Option[]
}

export interface Option {
    id: string
    title: string
    rates: number
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
