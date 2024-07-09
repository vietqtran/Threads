import React, { useCallback, useEffect } from 'react'
import MainContent from './MainContent'
import { v4 as uuidv4 } from 'uuid'

const CreateThread = () => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowY = 'hidden'
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const [threads, setThreads] = React.useState<{ id: string }[]>([{ id: uuidv4() }])

  const addSubThread = useCallback(() => {
    setThreads(prev => [...prev, { id: uuidv4() }])
  }, [uuidv4, threads])

  const removeSubThread = useCallback(
    (id: string) => {
      setThreads(threads.filter(thread => thread.id !== id))
    },
    [threads]
  )

  return (
    <div onClick={e => e.stopPropagation()} className="w-full max-w-[668px]">
      <div className="flex h-[46px] w-full items-center justify-center">
        <span className="text-base font-bold text-white">New thread</span>
      </div>
      <div className="mb-4 mt-2 w-full px-6">
        <div className="flex size-full max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-2xl bg-content dark:border">
          <div className="hide-scrollbar w-full overflow-auto">
            <div className="size-full flex flex-col gap-2 p-6 pb-4">
              {threads.map((thread, index) => (
                <MainContent
                  id={thread.id}
                  addSubThread={addSubThread}
                  isLast={threads.length === index + 1}
                  isFirst={index === 0}
                  key={thread.id}
                  removeSubThread={removeSubThread}
                />
              ))}
            </div>
          </div>
          <div className="w-full p-6">
            <div className="flex h-9 items-center justify-between">
              <span className="block cursor-pointer text-secondary">Anyone can reply & quote</span>
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
