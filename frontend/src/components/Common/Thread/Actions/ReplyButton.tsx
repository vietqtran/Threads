import React from 'react'
import Icon from '../../Icon'

interface Props {
  threadId: string
}

const ReplyButton = ({ threadId }: Props) => {
  return (
    <div className="group relative flex h-9 min-w-9 cursor-pointer items-center justify-center gap-1 px-2 duration-75 ease-linear active:scale-90">
      <div className="absolute inset-0 z-[-1] size-full scale-50 rounded-full opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:bg-content-hover group-hover:opacity-100"></div>
      <Icon name="thread_footer_comment_white" className="hidden dark:block" size={20} />
      <Icon name="thread_footer_comment_black" className="dark:hidden" size={20} />
      <span className="mt-1 block text-[13px] leading-[18px]">999</span>
    </div>
  )
}

export default ReplyButton
