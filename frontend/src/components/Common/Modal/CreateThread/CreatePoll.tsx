import { useThread } from '@/providers/CreateThreadProvider'
import React, { memo } from 'react'

type Props = {
  threadId: string
}

const CreatePoll = ({ threadId }: Props) => {
  const { dispatch } = useThread()

  const option1 = React.useRef<HTMLInputElement>(null)
  const option2 = React.useRef<HTMLInputElement>(null)
  const option3 = React.useRef<HTMLInputElement>(null)
  const option4 = React.useRef<HTMLInputElement>(null)
  const addOption = React.useRef<HTMLInputElement>(null)

  const [optionQuantity, setOptionQuantity] = React.useState(2)

  return (
    <>
      <div className="mb-1 mt-2 flex w-full flex-col gap-2">
        <div className="flex h-10 w-full items-center justify-start rounded-xl border">
          <input
            ref={option1}
            type="text"
            onKeyDown={e => e.key === 'Enter' && option2.current?.focus()}
            className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="Yes"
          />
        </div>
        <div className="flex h-10 w-full items-center justify-start rounded-xl border">
          <input
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
              ref={option3}
              type="text"
              onKeyDown={e => e.key === 'Enter' && option4.current?.focus()}
              onBlur={() => {
                if (!option3.current?.value) {
                  if (optionQuantity === 3) {
                    setOptionQuantity(2)
                    setTimeout(() => option3.current?.focus(), 0)
                    return
                  }
                  if (optionQuantity === 4) {
                    if (option3 && option3.current) {
                      option3.current.value = option4.current?.value ?? ''
                      if (option4 && option4.current) {
                        option4.current.value = ''
                      }
                      setOptionQuantity(3)
                      setTimeout(() => option3.current?.focus(), 0)
                    }
                  }
                }
              }}
              onChange={e => {
                if (e.target.value === '') {
                  if (optionQuantity === 3) {
                    setOptionQuantity(2)
                    setTimeout(() => option2.current?.focus(), 0)
                  }
                  if (optionQuantity === 4) {
                    if (option3 && option3.current) {
                      option3.current.value = option4.current?.value ?? ''
                      if (option4 && option4.current) {
                        option4.current.value = ''
                      }
                      setOptionQuantity(3)
                      setTimeout(() => option3.current?.focus(), 0)
                    }
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
              ref={option4}
              type="text"
              onBlur={() => {
                if (!option4.current?.value) {
                  setOptionQuantity(3)
                  setTimeout(() => option3.current?.focus(), 0)
                }
              }}
              onChange={e => {
                if (e.target.value === '') {
                  setOptionQuantity(3)
                  setTimeout(() => option3.current?.focus(), 0)
                }
              }}
              className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
              placeholder="No"
            />
          </div>
        )}
        {!(optionQuantity === 4) && (
          <div
            onClick={() => addOption.current?.focus()}
            className="flex h-10 w-full cursor-text items-center justify-start rounded-xl border border-dashed p-3"
          >
            <input
              ref={addOption}
              onChange={e => {
                if (optionQuantity === 2) {
                  setOptionQuantity(3)
                  setTimeout(() => {
                    if (option3 && option3.current) {
                      option3.current.value = e.target.value ?? ''
                    }
                    option3.current?.focus()
                    if (addOption.current) {
                      addOption.current.value = ''
                    }
                  }, 0)
                  return
                }
                if (optionQuantity === 3 && option3.current?.value) {
                  setOptionQuantity(4)
                  setTimeout(() => {
                    if (option4 && option4.current) {
                      option4.current.value = e.target.value ?? ''
                      option4.current?.focus()
                      if (addOption.current) {
                        addOption.current.value = ''
                      }
                    }
                  }, 0)
                } else {
                  optionQuantity === 3 && option3.current?.focus()
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
