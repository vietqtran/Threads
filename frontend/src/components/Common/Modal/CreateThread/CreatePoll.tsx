import { THREAD_TYPE } from '@/enums/thread-type'
import { PollOption, useThread } from '@/providers/CreateThreadProvider'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
    threadId: string
    options: PollOption[]
}

const CreatePoll = ({ threadId, options }: Props) => {
    const { dispatch } = useThread()

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (options.length > 2) {
            inputRefs.current[options.length - 1]?.focus()
        }
    }, [options.length])

    const handleAddOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (options.length === 2) {
            dispatch({
                type: 'ADD_POLL_OPTION',
                payload: {
                    optionId: '3',
                    threadId,
                    value
                }
            })
            e.target.value = ''
            return
        }
        if (options.length === 3) {
            dispatch({
                type: 'ADD_POLL_OPTION',
                payload: {
                    optionId: '4',
                    threadId,
                    value
                }
            })
            e.target.value = ''
            return
        }
    }

    const handleUpdateOption = (e: React.FormEvent<HTMLInputElement>, optionId: string) => {
        const value = e.currentTarget.value
        if (!value && ['3', '4'].includes(optionId)) {
            dispatch({
                type: 'REMOVE_POLL_OPTION',
                payload: {
                    optionId,
                    threadId
                }
            })
            inputRefs.current[+optionId - 1]?.focus()
            return
        }
        dispatch({
            type: 'UPDATE_POLL_OPTION',
            payload: {
                optionId,
                threadId,
                value
            }
        })
    }

    return (
        <>
            <div className="mb-1 mt-2 flex w-full flex-col gap-2">
                {options.map((o, i) => {
                    return (
                        <div
                            key={`option-${i}`}
                            className={`flex h-10 w-full items-center justify-start rounded-xl border`}
                        >
                            <input
                                ref={el => {
                                    inputRefs.current[i] = el
                                }}
                                autoFocus={i === 0}
                                value={o.title}
                                onInput={e => handleUpdateOption(e, (i + 1).toString())}
                                type="text"
                                placeholder={i === 0 ? 'Yes' : i === 1 ? 'No' : ''}
                                className="size-full bg-transparent p-3 text-sm font-semibold placeholder:text-[#999999] dark:placeholder:text-[#777777]"
                            />
                        </div>
                    )
                })}
                {options.length !== 4 && (
                    <div className="flex overflow-hidden h-10 w-full cursor-text items-center justify-start rounded-xl border border-dashed">
                        <input
                            onInput={handleAddOption}
                            placeholder="Add another option"
                            className="leading-0 h-full w-full px-3 text-sm font-semibold bg-transparent placeholder:text-[#999999] dark:placeholder:text-[#777777]"
                        />
                    </div>
                )}
            </div>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-description text-xs">Ends in 24h</span>
                <span
                    onClick={() => {
                        dispatch({
                            type: 'SET_THREAD_TYPE',
                            payload: {
                                id: threadId,
                                threadType: THREAD_TYPE.DEFAULT
                            }
                        })
                    }}
                    className="text-description cursor-pointer text-xs font-semibold"
                >
                    Remove poll
                </span>
            </div>
        </>
    )
}

export default memo(CreatePoll)
