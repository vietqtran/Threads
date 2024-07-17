import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { THREAD_TYPE } from '@/enums/thread-type'

export type Poll = {
  options: {
    id: string
    title: string
    rates?: number
  }[]
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

// Define action types
type Action =
  | { type: 'ADD_THREAD' }
  | { type: 'REMOVE_THREAD'; payload: { id: string } }
  | { type: 'UPDATE_CONTENT'; payload: { id: string; content: string } }
  | { type: 'ADD_IMAGE'; payload: { id: string; image: { id: string; file: File } } }
  | { type: 'REMOVE_IMAGE'; payload: { threadId: string; imageId: string } }
  | { type: 'SET_POLL'; payload: { id: string; poll: any } }
  | { type: 'REMOVE_POLL'; payload: { id: string } }
  | { type: 'SET_THREAD_TYPE'; payload: { id: string; threadType: THREAD_TYPE } }
  | { type: 'UPDATE_POLL'; payload: {threadId: string, poll: Poll}} 

const ThreadContext = createContext<
  | {
      state: ThreadState
      dispatch: React.Dispatch<Action>
    }
  | undefined
>(undefined)

// Reducer function
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
    default:
      return state
  }
}

// Helper functions for the reducer
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
      ],
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
        ? { ...thread, images: [...thread.images, image], poll: {
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
          ],
        }, threadType: THREAD_TYPE.DEFAULT }
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
      thread.id === threadId ? { ...thread, poll: {
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
        ],
      }, threadType: THREAD_TYPE.DEFAULT } : thread
    )
  }
}

const setThreadType = (state: ThreadState, id: string, threadType: THREAD_TYPE): ThreadState => {
  return {
    ...state,
    threads: state.threads.map(thread => (thread.id === id ? { ...thread, threadType } : thread))
  }
}

const updatePoll = (state: ThreadState, threadId: string, poll: Poll): ThreadState => {
  return {
    ...state,
    threads: state.threads.map(thread => {
      if(thread.id === threadId) {
        return {
          ...thread,
          poll
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
          ],
        },
        threadType: THREAD_TYPE.DEFAULT
      }
    ]
  })

  return <ThreadContext.Provider value={{ state, dispatch }}>{children}</ThreadContext.Provider>
}

// Custom hook to use the thread context
export const useThread = () => {
  const context = useContext(ThreadContext)
  if (context === undefined) {
    throw new Error('useThread must be used within a CreateThreadProvider')
  }
  return context
}
