import React, { memo } from 'react'
import Icon from '../../Icon'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import ShowPosition from '../../Wrapper/ShowPosition'

interface Props {
  threadId: string
}

const Options = ({ threadId }: Props) => {
  const [isSaved, setIsSaved] = React.useState(false)
  const [isBlock, setIsBlock] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const ref = useClickOutside(() => setShow(false))
  return (
    <div ref={ref} className="relative z-10 size-6 flex-shrink-0">
      <div
        onClick={() => setShow(!show)}
        className="group relative grid size-full cursor-pointer place-items-center duration-75 ease-linear hover:scale-105 active:scale-95"
      >
        <Icon name="home_thread_dots_black" size={20} className="dark:hidden" />
        <Icon name="home_thread_dots_white" size={20} className="hidden dark:block" />
        <div className="absolute left-1/2 top-1/2 z-[-1] size-8 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-content-hover opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:opacity-100"></div>
      </div>
      <AnimatePresence>
        {show && (
          <ShowPosition
            threshold={0.5}
            className="absolute -right-3 w-60 origin-top-right rounded-2xl border bg-content shadow"
          >
            <div className="size-full border-b p-2">
              <div
                onClick={() => setIsSaved(!isSaved)}
                className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
              >
                <div className="flex h-5 w-full items-center justify-between gap-2">
                  <span className="font-medium">{isSaved ? 'Unsave' : 'Save'}</span>
                  {isSaved ? (
                    <>
                      <Icon name="unsave_black" className="dark:hidden" size={19} />
                      <Icon name="unsave_white" className="hidden dark:block" size={19} />
                    </>
                  ) : (
                    <>
                      <Icon name="save_black" className="dark:hidden" size={20} />
                      <Icon name="save_white" className="hidden dark:block" size={20} />
                    </>
                  )}
                </div>
              </div>
              <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                <div className="flex h-5 w-full items-center justify-between gap-2">
                  <span className="font-medium">{'Not interested'}</span>
                  <div>
                    <Icon name="hidden_black" className="dark:hidden" size={20} />
                    <Icon name="hidden_white" className="hidden dark:block" size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="size-full border-b p-2">
              <div
                onClick={() => setIsBlock(!isBlock)}
                className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
              >
                <div className="flex h-5 w-full items-center justify-between gap-2">
                  <span className="font-medium text-red">{isBlock ? 'Unblock' : 'Block'}</span>
                  {isBlock ? <Icon name="unblock_red" size={20} /> : <Icon name="block_red" size={20} />}
                </div>
              </div>
              <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                <div className="flex h-5 w-full items-center justify-between gap-2">
                  <span className="font-medium text-red">{'Report'}</span>
                  <Icon name="report_red" size={20} />
                </div>
              </div>
            </div>

            <div className="size-full p-2">
              <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                <div className="flex h-5 w-full items-center justify-between gap-2">
                  <span className="font-medium">{'Copy link'}</span>
                  <Icon name="thread_action_share_copy_link_black" className="dark:hidden" size={20} />
                  <Icon name="thread_action_share_copy_link_white" className="hidden dark:block" size={20} />
                </div>
              </div>
            </div>
          </ShowPosition>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(Options)
