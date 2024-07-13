import React, { Fragment, useCallback, useEffect } from 'react'
import MainContent from './MainContent'
import { v4 as uuidv4 } from 'uuid'
import { CreateThreadProvider, useThread } from '@/providers/CreateThreadProvider'
import Audience from './Audience'

const CreateThread = () => {
  const { state, dispatch } = useThread()
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

  return (
    <div onClick={e => e.stopPropagation()} className="w-full max-w-[668px]">
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
  )
}

export default CreateThread
