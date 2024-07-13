import React from 'react'
import Icon from '../../Icon'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'

interface Props {
  threadId: string
}

const RepostButton = ({ threadId }: Props) => {
  const [show, setShow] = React.useState(false)
  const optionRef = useClickOutside(() => setShow(false))
  return (
    <div ref={optionRef} className="relative z-[999] h-9 min-w-9 cursor-pointer">
      <div
        onClick={() => setShow(!show)}
        className="group relative grid size-full place-items-center px-2 duration-75 ease-linear active:scale-90"
      >
        <div className="absolute inset-0 z-[-1] size-full scale-50 rounded-full opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:bg-content-hover group-hover:opacity-100"></div>
        <Icon name="thread_footer_repost_white" className="hidden dark:block" size={20} />
        <Icon name="thread_footer_repost_black" className="dark:hidden" size={20} />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -left-1 top-full w-60 origin-top-left rounded-2xl border bg-content p-2 shadow"
          >
            <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-5 w-full items-center justify-between gap-2">
                <span className="font-medium">{'Repost'}</span>
                <div>
                  <Icon name="thread_footer_repost_black" className="dark:hidden" size={20} />
                  <Icon name="thread_footer_repost_white" className="hidden dark:block" size={20} />
                </div>
              </div>
            </div>
            <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-5 w-full items-center justify-between gap-2">
                <span className="font-medium">{'Quote'}</span>
                <div>
                  <Icon name="thread_action_repost_quote_black" className="dark:hidden" size={20} />
                  <Icon name="thread_action_repost_quote_white" className="hidden dark:block" size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RepostButton
