'use client'

import React, { memo } from 'react'
import LikeButton from './LikeButton'
import ReplyButton from './ReplyButton'
import RepostButton from './RepostButton'
import ShareButton from './ShareButton'

interface Props {
    threadId: string
}

const Actions = ({ threadId }: Props) => {
    return (
        <div className="flex w-full gap-2 pl-[64px]">
            <LikeButton threadId={threadId} />
            <ReplyButton threadId={threadId} />
            <RepostButton threadId={threadId} />
            <ShareButton threadId={threadId} />
        </div>
    )
}

export default memo(Actions)
