import React from 'react'
import Icon from '../../Icon'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import ShowPosition from '../../Wrapper/ShowPosition'

interface Props {
  threadId: string
}

const ShareButton = ({ threadId }: Props) => {
  const [show, setShow] = React.useState(false)
  const optionRef = useClickOutside(() => setShow(false))
  return (
    <div ref={optionRef} className="relative z-[999] h-9 min-w-9 cursor-pointer">
      <div
        onClick={() => setShow(!show)}
        className="group relative grid size-full place-items-center px-2 duration-75 ease-linear active:scale-90"
      >
        <div className="absolute inset-0 z-[-1] size-full scale-50 rounded-full opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:bg-content-hover group-hover:opacity-100"></div>
        <Icon name="thread_footer_share_white" className="hidden dark:block" size={20} />
        <Icon name="thread_footer_share_black" className="dark:hidden" size={20} />
      </div>
      <AnimatePresence>
        {show && (
          <ShowPosition className="absolute -left-1 w-60 origin-top-left rounded-2xl border bg-content p-2 shadow">
            <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-5 w-full items-center justify-between gap-2">
                <span className="font-medium">{'Copy link'}</span>
                <div>
                  <Icon name="thread_action_share_copy_link_black" className="dark:hidden" size={18} />
                  <Icon name="thread_action_share_copy_link_white" className="hidden dark:block" size={18} />
                </div>
              </div>
            </div>
            <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-5 w-full items-center justify-between gap-2">
                <span className="font-medium">{'Get embed code'}</span>
                <div>
                  <Icon name="thread_action_share_embed_black" className="dark:hidden" size={20} />
                  <Icon name="thread_action_share_embed_white" className="hidden dark:block" size={20} />
                </div>
              </div>
            </div>
          </ShowPosition>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShareButton
