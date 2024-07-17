import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import Icon from '../../Icon'
import Editor from '../../Editor'
import ViewImages from './ViewImages'
import { v4 as uuidv4 } from 'uuid'
import CreatePoll from './CreatePoll'
import { THREAD_TYPE } from '@/enums/thread-type'
import Image from 'next/image'
import { Poll, Thread, useThread } from '@/providers/CreateThreadProvider'

interface Props {
  thread: Thread
  addSubThread: (parentId: string) => void
  removeSubThread: (id: string, parentId?: string) => void
  isFirst: boolean
  isLast: boolean
}

const MainContent = ({ thread, addSubThread, removeSubThread, isFirst, isLast }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { dispatch } = useThread()

  const handleContentChange = useCallback(
    (content: string) => {
      dispatch({ type: 'UPDATE_CONTENT', payload: { id: thread.id, content } })
    },
    [dispatch, thread.id]
  )

  const handleSelectImages = useCallback(
    (images: { id: string; file: File }[]) => {
      images.forEach(image => {
        dispatch({ type: 'ADD_IMAGE', payload: { id: thread.id, image } })
      })
    },
    [dispatch, thread.id]
  )

  const handleRemoveImage = useCallback(
    (imageId: string) => {
      dispatch({ type: 'REMOVE_IMAGE', payload: { threadId: thread.id, imageId } })
    },
    [dispatch, thread.id]
  )

  const handleSetPoll = useCallback(
    (poll: Poll) => {
      dispatch({ type: 'SET_POLL', payload: { id: thread.id, poll } })
    },
    [dispatch, thread.id]
  )

  const handleSetThreadType = useCallback(
    (threadType: THREAD_TYPE) => {
      dispatch({ type: 'SET_THREAD_TYPE', payload: { id: thread.id, threadType } })
    },
    [dispatch, thread.id]
  )

  const isCanAddSubThread = thread.content.length > 0 || thread.images.length > 0 || thread.poll

  return (
    <>
      <div className="flex w-full flex-row flex-wrap gap-3">
        <div className="mt-1 flex min-h-full w-9 flex-shrink-0 flex-col gap-2.5">
          <div className="size-9 flex-shrink-0 overflow-hidden rounded-full border">
            <Image src={'/images/user.jpg'} className="size-full object-cover" width={500} height={500} alt="" />
          </div>
          <div className="flex h-full w-full flex-1 justify-center">
            <div className="h-full w-0.5 rounded-full bg-border"></div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="w-full flex items-center">
            <div className="font-medium flex-1 mr-2">vietqtran</div>
            {!isFirst && (
              <div
                onClick={() => removeSubThread(thread.id)}
                className="flex-shrink-0 cursor-pointer active:scale-90 duration-75 ease-linear"
              >
                <Icon name="create_thread_close_sub_thread_white" size={12} className="dark:block hidden" />
                <Icon name="create_thread_close_sub_thread_black" size={12} className="dark:hidden" />
              </div>
            )}
          </div>

          <Editor
            key={'create-thread-editor'}
            content={thread.content}
            setContent={handleContentChange}
            placeholder="Start a thread..."
            autoFocus={true}
          />
          {thread.threadType === THREAD_TYPE.POLL && <CreatePoll threadId={thread.id} />}
          <input
            key={'create-thread-file-input'}
            ref={fileInputRef}
            onChange={e => {
              handleSelectImages(
                e.target.files ? [...Array.from(e.target.files)].map(file => ({ id: uuidv4(), file })) : []
              )
            }}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
          />

          {thread.images && thread.images.length > 0 && (
            <ViewImages
              handleRemoveImage={handleRemoveImage}
              images={thread.images}
              key={`create-thread-view-images-${thread.id}`}
            />
          )}

          <div className="mt-1 w-full">
            <div className="relative -left-2 flex w-full">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90"
              >
                <div className="absolute z-[-1] size-full scale-75 rounded-full bg-content-hover opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:opacity-100"></div>
                <Icon name="create_thread_modal_add_image_black" className="dark:hidden" size={20} />
                <Icon name="create_thread_modal_add_image_white" className="hidden dark:block" size={20} />
              </div>
              <div className="group relative grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90">
                <div className="absolute z-[-1] size-full scale-75 rounded-full bg-content-hover opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:opacity-100"></div>
                <Icon name="create_thread_modal_add_gif_black" className="dark:hidden" size={20} />
                <Icon name="create_thread_modal_add_gif_white" className="hidden dark:block" size={20} />
              </div>
              <div className="group relative grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90">
                <div className="absolute z-[-1] size-full scale-75 rounded-full bg-content-hover opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:opacity-100"></div>
                <Icon name="create_thread_modal_add_tag_black" className="dark:hidden" size={24} />
                <Icon name="create_thread_modal_add_tag_white" className="hidden dark:block" size={24} />
              </div>
              <div
                onClick={() => handleSetThreadType(THREAD_TYPE.POLL)}
                className="group relative grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90"
              >
                <div className="absolute z-[-1] size-full scale-75 rounded-full bg-content-hover opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:opacity-100"></div>
                <Icon name="create_thread_modal_add_poll_black" className="dark:hidden" size={24} />
                <Icon name="create_thread_modal_add_poll_white" className="hidden dark:block" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLast && (
        <div className={`w-full pt-2 ${isCanAddSubThread ? '' : 'opacity-50'}`}>
          <div className="flex h-[21px] w-full items-center gap-3">
            <div className="flex h-full w-9 justify-center">
              <div className="size-4 overflow-hidden rounded-full border">
                <Image src={'/images/user.jpg'} className="size-full object-cover" width={500} height={500} alt="" />
              </div>
            </div>
            <span
              onClick={() => {
                isLast && isCanAddSubThread && addSubThread(thread.id)
              }}
              className={`mb-0.5 block  ${isCanAddSubThread ? 'cursor-pointer active:scale-95 duration-75 ease-linear' : 'cursor-not-allowed'}`}
            >
              Add to thread
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(MainContent)
