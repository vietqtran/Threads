import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { THREAD_TYPE } from '@/enums/thread-type'

export type PollOption = {
    id: string
    title: string
    rates?: number
}

export type Poll = {
    options: PollOption[]
}

export interface Thread {
    id: string
    content: string
    images: { id: string; file: File }[]
    poll: Poll
    threadType: THREAD_TYPE
}

interface ThreadState {
    threads: Thread[]
}

type Action =
    | { type: 'ADD_THREAD' }
    | { type: 'REMOVE_THREAD'; payload: { id: string } }
    | { type: 'UPDATE_CONTENT'; payload: { id: string; content: string } }
    | { type: 'ADD_IMAGE'; payload: { id: string; image: { id: string; file: File } } }
    | { type: 'REMOVE_IMAGE'; payload: { threadId: string; imageId: string } }
    | { type: 'SET_POLL'; payload: { id: string; poll: Poll } }
    | { type: 'REMOVE_POLL'; payload: { id: string } }
    | { type: 'SET_THREAD_TYPE'; payload: { id: string; threadType: THREAD_TYPE } }
    | { type: 'UPDATE_POLL'; payload: { threadId: string; poll: Poll } }
    | { type: 'ADD_POLL_OPTION'; payload: { threadId: string; optionId: string; value: string } }
    | { type: 'REMOVE_POLL_OPTION'; payload: { threadId: string; optionId: string } }
    | { type: 'UPDATE_POLL_OPTION'; payload: { threadId: string; optionId: string; value: string } }

const ThreadContext = createContext<
    | {
          state: ThreadState
          dispatch: React.Dispatch<Action>
      }
    | undefined
>(undefined)

const threadReducer = (state: ThreadState, action: Action): ThreadState => {
    switch (action.type) {
        case 'ADD_THREAD':
            return addThread(state)
        case 'REMOVE_THREAD':
            return removeThread(state, action.payload.id)
        case 'UPDATE_CONTENT':
            return updateThreadContent(state, action.payload.id, action.payload.content)
        case 'ADD_IMAGE':
            return addImage(state, action.payload.id, action.payload.image)
        case 'REMOVE_IMAGE':
            return removeImage(state, action.payload.threadId, action.payload.imageId)
        case 'SET_POLL':
            return setPoll(state, action.payload.id, action.payload.poll)
        case 'REMOVE_POLL':
            return removePoll(state, action.payload.id)
        case 'SET_THREAD_TYPE':
            return setThreadType(state, action.payload.id, action.payload.threadType)
        case 'UPDATE_POLL':
            return updatePoll(state, action.payload.threadId, action.payload.poll)
        case 'UPDATE_POLL_OPTION':
            return updatePollOptions(
                state,
                action.payload.threadId,
                action.payload.optionId,
                action.payload.value,
                true
            )
        case 'ADD_POLL_OPTION':
            return updatePollOptions(state, action.payload.threadId, action.payload.optionId, action.payload.value)
        case 'REMOVE_POLL_OPTION':
            return removePollOption(state, action.payload.threadId, action.payload.optionId)
        default:
            return state
    }
}

const addThread = (state: ThreadState): ThreadState => {
    const newThread: Thread = {
        id: uuidv4(),
        content: '',
        images: [],
        poll: {
            options: [
                {
                    id: '1',
                    title: ''
                },
                {
                    id: '2',
                    title: ''
                }
            ]
        },
        threadType: THREAD_TYPE.DEFAULT
    }

    return { ...state, threads: [...state.threads, newThread] }
}

const removeThread = (state: ThreadState, id: string): ThreadState => {
    return { ...state, threads: state.threads.filter(thread => thread.id !== id) }
}

const updateThreadContent = (state: ThreadState, id: string, content: string): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread => (thread.id === id ? { ...thread, content } : thread))
    }
}

const addImage = (state: ThreadState, id: string, image: { id: string; file: File }): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread =>
            thread.id === id
                ? {
                      ...thread,
                      images: [...thread.images, image],
                      poll: {
                          title: '',
                          options: [
                              {
                                  id: '1',
                                  title: ''
                              },
                              {
                                  id: '2',
                                  title: ''
                              }
                          ]
                      },
                      threadType: THREAD_TYPE.DEFAULT
                  }
                : thread
        )
    }
}

const removeImage = (state: ThreadState, threadId: string, imageId: string): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread =>
            thread.id === threadId ? { ...thread, images: thread.images.filter(img => img.id !== imageId) } : thread
        )
    }
}

const setPoll = (state: ThreadState, id: string, poll: Poll): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread =>
            thread.id === id ? { ...thread, poll, images: [], threadType: THREAD_TYPE.POLL } : thread
        )
    }
}

const removePoll = (state: ThreadState, threadId: string): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread =>
            thread.id === threadId
                ? {
                      ...thread,
                      poll: {
                          title: '',
                          options: [
                              {
                                  id: '1',
                                  title: ''
                              },
                              {
                                  id: '2',
                                  title: ''
                              }
                          ]
                      },
                      threadType: THREAD_TYPE.DEFAULT
                  }
                : thread
        )
    }
}

const setThreadType = (state: ThreadState, id: string, threadType: THREAD_TYPE): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread =>
            thread.id === id
                ? {
                      ...thread,
                      poll:
                          threadType === THREAD_TYPE.POLL
                              ? {
                                    options: [
                                        { id: '1', title: '' },
                                        { id: '2', title: '' }
                                    ]
                                }
                              : { options: [] },
                      images: [],
                      threadType
                  }
                : thread
        )
    }
}

const updatePoll = (state: ThreadState, threadId: string, poll: Poll): ThreadState => {
    return {
        ...state,
        threads: state.threads.map(thread => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    poll
                }
            }
            return thread
        })
    }
}

const updatePollOptions = (state: ThreadState, threadId: string, optionId: string, value: string, isUpdate = false) => {
    return {
        ...state,
        threads: state.threads.map(thread => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    poll: {
                        ...thread.poll,
                        options: isUpdate
                            ? [
                                  ...thread.poll.options.map(o => {
                                      if (o.id === optionId) {
                                          return {
                                              ...o,
                                              title: value
                                          }
                                      }
                                      return o
                                  })
                              ]
                            : [
                                  ...thread.poll.options,
                                  {
                                      id: optionId,
                                      title: value
                                  }
                              ]
                    }
                }
            }
            return thread
        })
    }
}

const removePollOption = (state: ThreadState, threadId: string, optionId: string) => {
    return {
        ...state,
        threads: state.threads.map(thread => {
            if (thread.id === threadId && thread.poll) {
                const optionIndex = thread.poll.options.findIndex(o => o.id === optionId)
                if (optionIndex !== -1) {
                    const newOptions = [...thread.poll.options]
                    newOptions.splice(optionIndex, 1)
                    const renumberedOptions = newOptions.map((option, index) => ({
                        ...option,
                        id: (index + 1).toString()
                    }))
                    return {
                        ...thread,
                        poll: {
                            ...thread.poll,
                            options: renumberedOptions
                        }
                    }
                }
            }
            return thread
        })
    }
}

// CreateThreadProvider component
export const CreateThreadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(threadReducer, {
        threads: [
            {
                id: uuidv4(),
                content: '',
                images: [],
                poll: {
                    options: [
                        {
                            id: '1',
                            title: ''
                        },
                        {
                            id: '2',
                            title: ''
                        }
                    ]
                },
                threadType: THREAD_TYPE.DEFAULT
            }
        ]
    })

    return <ThreadContext.Provider value={{ state, dispatch }}>{children}</ThreadContext.Provider>
}

export const useThread = () => {
    const context = useContext(ThreadContext)
    if (context === undefined) {
        throw new Error('useThread must be used within a CreateThreadProvider')
    }
    return context
}
