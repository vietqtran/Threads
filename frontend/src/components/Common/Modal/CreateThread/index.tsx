import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MainContent from './MainContent'
import { useThread } from '@/providers/CreateThreadProvider'
import Audience from './Audience'
import { useClickOutside } from '@/hooks/useClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { useModalStore } from '@/providers/StoresProvider'
import { THREAD_TYPE } from '@/enums/thread-type'

const CreateThread = () => {
  const [isConfirm, setIsConfirm] = useState(false)
  const { state, dispatch } = useThread()
  const { closeModal } = useModalStore(state => state)

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowY = 'hidden'
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const addThread = useCallback(() => {
    dispatch({ type: 'ADD_THREAD' })
  }, [dispatch])

  const removeThread = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE_THREAD', payload: { id } })
    },
    [dispatch]
  )

  const isCanPost = useMemo(() => {
    return state.threads.some(
      thread =>
        thread.content.length > 0 ||
        thread.images.length > 0 ||
        (thread.poll &&
          thread.threadType === THREAD_TYPE.POLL &&
          thread.poll.options[0].title &&
          thread.poll.options[1].title)
    )
  }, [state])

  const ref = useClickOutside(() => {
    isCanPost && setIsConfirm(true)
  })

  const confirmRef = useClickOutside(() => {
    setIsConfirm(false)
  })

  return (
    <>
      <div onClick={e => isCanPost ?? e.stopPropagation()} className="size-full z-0 grid place-items-center">
        <div ref={ref} className="w-full max-w-[668px]">
          <div className="flex h-[46px] w-full items-center justify-center">
            <span className="text-base font-bold text-white">New thread</span>
          </div>
          <div className="mb-4 mt-2 w-full px-6">
            <div className="flex size-full max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-2xl bg-content dark:border">
              <div className="hide-scrollbar w-full overflow-auto">
                <div className="flex size-full flex-col gap-2 p-6 pb-4">
                  {state.threads.map((thread, index) => (
                    <MainContent
                      key={thread.id}
                      thread={thread}
                      addSubThread={addThread}
                      isLast={state.threads.length === index + 1}
                      isFirst={index === 0}
                      removeSubThread={removeThread}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full p-6">
                <div className="flex h-9 items-center justify-between">
                  <Audience />
                  <button className="h-9 rounded-lg border px-4 pt-0.5 font-medium duration-75 ease-linear active:scale-95">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="px-5 size-full bg-black/40 z-10 absolute inset-0 grid place-items-center"
          >
            <div ref={confirmRef} className="w-full border rounded-2xl max-w-[250px] bg-content flex flex-col">
              <div className="w-full text-center p-6 border-b">haha</div>
              <div className="grid grid-cols-2">
                <div onClick={closeModal} className="col-span-1 border-r p-4 cursor-pointer text-center">
                  Yes
                </div>
                <div onClick={() => setIsConfirm(false)} className="col-span-1 p-4 cursor-pointer text-center">
                  No
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CreateThread
