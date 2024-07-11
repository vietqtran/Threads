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
      <div className="w-full mt-2 flex flex-col gap-2 mb-1">
        <div className="rounded-xl p-3 flex items-center justify-start h-10 w-full border">
          <input
            ref={option1}
            type="text"
            onKeyDown={e => e.key === 'Enter' && option2.current?.focus()}
            className="text-sm font-semibold w-full placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="Yes"
          />
        </div>
        <div className="rounded-xl p-3 flex items-center justify-start h-10 w-full border">
          <input
            ref={option2}
            type="text"
            onKeyDown={e => e.key === 'Enter' && option3.current?.focus()}
            className="text-sm font-semibold w-full placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="No"
          />
        </div>
        <div
          className={`rounded-xl p-3 flex items-center justify-start h-10 w-full border ${optionQuantity >= 3 ? '' : 'hidden'}`}
        >
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
            className="text-sm font-semibold w-full placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="No"
          />
        </div>
        <div
          className={`rounded-xl p-3 flex items-center justify-start h-10 w-full border ${optionQuantity === 4 ? '' : 'hidden'}`}
        >
          <input
            ref={option4}
            type="text"
            onBlur={() => {
              if (!option4.current?.value) {
                setOptionQuantity(3)
                setTimeout(() => option3.current?.focus(), 0)
              }
            }}
            className="text-sm font-semibold w-full placeholder:text-[#999999] dark:placeholder:text-[#777777]"
            placeholder="No"
          />
        </div>
        {!(optionQuantity === 4) && (
          <div className="rounded-xl p-3 flex items-center justify-start h-10 w-full border border-dashed">
            <div
              ref={addOption}
              onClick={() => {
                if (optionQuantity === 2) {
                  setOptionQuantity(3)
                  setTimeout(() => option3.current?.focus(), 0)
                  return
                }
                if (optionQuantity === 3 && option3.current?.value) {
                  setOptionQuantity(4)
                  setTimeout(() => option4.current?.focus(), 0)
                } else {
                  optionQuantity === 3 && option3.current?.focus()
                }
              }}
              className="text-sm leading-0 font-semibold w-full cursor-text text-description"
            >
              Add another option
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center mt-2 justify-between">
        <span className="text-xs text-description">Ends in 24h</span>
        <span
          onClick={() => dispatch({ type: 'REMOVE_POLL', payload: { id: threadId } })}
          className="text-xs cursor-pointer text-description font-semibold"
        >
          Remove poll
        </span>
      </div>
    </>
  )
}

export default memo(CreatePoll)
