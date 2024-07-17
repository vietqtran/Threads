import { Poll, useThread } from '@/providers/CreateThreadProvider'
import React, { memo, useMemo } from 'react'

type Props = {
  threadId: string
}

const CreatePoll = ({ threadId }: Props) => {
  const { dispatch, state } = useThread()
  const thread = useMemo(() => {
    return state.threads.filter((th) => th.id === threadId)[0]
  }, [state, threadId])

  const option1 = React.useRef<HTMLInputElement>(null)
  const option2 = React.useRef<HTMLInputElement>(null)
  const option3 = React.useRef<HTMLInputElement>(null)
  const option4 = React.useRef<HTMLInputElement>(null)
  const addOption = React.useRef<HTMLInputElement>(null)

  const [optionQuantity, setOptionQuantity] = React.useState(2)

  const updatePoll = (updatedPoll: Poll) => {
    dispatch({
      type: 'UPDATE_POLL',
      payload: {
        threadId,
        poll: updatedPoll
      }
    })
  }

  const setOptionTitle = (title: string, id: string) => {
    const updatedOptions = thread.poll.options.map(o => 
      o.id === id ? { ...o, title } : o
    )
    updatePoll({ ...thread.poll, options: updatedOptions })
  }

  const handleAddOption = (id: string, title: string) => {
    const updatedOptions = [...thread.poll.options, { id, title }]
    updatePoll({ ...thread.poll, options: updatedOptions })
  }

  const handleRemoveOption = (id: string) => {
    const updatedOptions = thread.poll.options.filter(o => o.id !== id)
    updatePoll({ ...thread.poll, options: updatedOptions })
  }

  return (
    <>
      <div className="mb-1 mt-2 flex w-full flex-col gap-2">
        <div className="flex h-10 w-full items-center justify-start rounded-xl border">
          <input
            value={thread.poll.options.find(o => o.id === '1')?.title || ''}
            onChange={(e) => setOptionTitle(e.target.value, '1')}
            ref={option1}
            type="text"
            onKeyDown={e => e.key === 'Enter' && option2.current?.focus()}
            className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="Yes"
          />
        </div>
        <div className="flex h-10 w-full items-center justify-start rounded-xl border">
          <input
            value={thread.poll.options.find(o => o.id === '2')?.title || ''}
            onChange={(e) => setOptionTitle(e.target.value, '2')}
            ref={option2}
            type="text"
            onKeyDown={e => e.key === 'Enter' && option3.current?.focus()}
            className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="No"
          />
        </div>
        {optionQuantity >= 3 && (
          <div className={`flex h-10 w-full items-center justify-start rounded-xl border`}>
            <input
              value={thread.poll.options.find(o => o.id === '3')?.title || ''}
              onChange={(e) => setOptionTitle(e.target.value, '3')}
              ref={option3}
              type="text"
              onKeyDown={e => e.key === 'Enter' && option4.current?.focus()}
              onBlur={() => {
                if (!thread.poll.options.find(o => o.id === '3')?.title) {
                  if (optionQuantity === 3) {
                    setOptionQuantity(2)
                    handleRemoveOption('3')
                  } else if (optionQuantity === 4) {
                    const option4Value = thread.poll.options.find(o => o.id === '4')?.title || ''
                    setOptionTitle(option4Value, '3')
                    handleRemoveOption('4')
                    setOptionQuantity(3)
                  }
                }
              }}
              className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            />
          </div>
        )}
        {optionQuantity === 4 && (
          <div className={`flex h-10 w-full items-center justify-start rounded-xl border`}>
            <input
              value={thread.poll.options.find(o => o.id === '4')?.title || ''}
              onChange={(e) => setOptionTitle(e.target.value, '4')}
              ref={option4}
              type="text"
              onBlur={() => {
                if (!thread.poll.options.find(o => o.id === '4')?.title) {
                  handleRemoveOption('4')
                  setOptionQuantity(3)
                }
              }}
              className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            />
          </div>
        )}
        {optionQuantity < 4 && (
          <div
            onClick={() => addOption.current?.focus()}
            className="flex h-10 w-full cursor-text items-center justify-start rounded-xl border border-dashed p-3"
          >
            <input
              ref={addOption}
              onChange={(e) => {
                const newValue = e.target.value
                if (optionQuantity === 2) {
                  handleAddOption('3', newValue)
                  setOptionQuantity(3)
                  setTimeout(() => {
                    option3.current?.focus()
                    if (addOption.current) {
                      addOption.current.value = ''
                    }
                  }, 0)
                } else if (optionQuantity === 3 && thread.poll.options.find(o => o.id === '3')?.title) {
                  handleAddOption('4', newValue)
                  setOptionQuantity(4)
                  setTimeout(() => {
                    option4.current?.focus()
                    if (addOption.current) {
                      addOption.current.value = ''
                    }
                  }, 0)
                } else {
                  option3.current?.focus()
                }
              }}
              placeholder="Add another option"
              className="leading-0 text-description h-full w-full text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-description text-xs">Ends in 24h</span>
        <span
          onClick={() => dispatch({ type: 'REMOVE_POLL', payload: { id: threadId } })}
          className="text-description cursor-pointer text-xs font-semibold"
        >
          Remove poll
        </span>
      </div>
    </>
  )
}

export default memo(CreatePoll)