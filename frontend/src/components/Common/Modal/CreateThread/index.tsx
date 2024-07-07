import Image from 'next/image'
import React from 'react'
import Icon from '../../Icon'
import Editor from '../../Editor'
import { THREAD_TYPE } from '@/enums/thread-type'
import ViewImages from './ViewImages'
import { v4 as uuidv4 } from 'uuid'

const CreateThread = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [content, setContent] = React.useState<string>('')
  const [images, setImages] = React.useState<{ id: string; file: File }[]>([])

  const handleSelectImages = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setImages([
        ...images,
        ...Array.from(files).map(file => {
          return { id: uuidv4(), file }
        })
      ])
    }
  }

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(image => image.id !== id))
  }

  return (
    <div onClick={e => e.stopPropagation()} className="w-full max-w-[668px]">
      <div className="flex h-[46px] w-full items-center justify-center">
        <span className="text-base font-bold text-white">New thread</span>
      </div>
      <div className="mb-4 mt-2 w-full px-6">
        <div className="flex size-full max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-2xl bg-content dark:border">
          <div className="hide-scrollbar w-full overflow-auto">
            <div className="size-full p-6 pb-4">
              <div className="flex w-full flex-row flex-wrap gap-3">
                <div className="mt-1 flex min-h-full w-9 flex-shrink-0 flex-col gap-2.5">
                  <div className="size-9 flex-shrink-0 overflow-hidden rounded-full border">
                    <Image
                      src={'/images/user.jpg'}
                      className="size-full object-cover"
                      width={500}
                      height={500}
                      alt=""
                    />
                  </div>
                  <div className="flex h-full w-full flex-1 justify-center">
                    <div className="h-full w-0.5 rounded-full bg-border"></div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">vietqtran</span>

                  <Editor
                    key={'create-thread-editor'}
                    content={content}
                    setContent={setContent}
                    placeholder="Start a thread..."
                    autoFocus={true}
                  />
                  <input
                    key={'create-thread-file-input'}
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                  />

                  {images && images.length > 0 && (
                    <ViewImages
                      handleRemoveImage={handleRemoveImage}
                      images={images}
                      key={'create-thread-view-images'}
                    />
                  )}

                  <div className="mt-1 w-full">
                    <div className="relative -left-2 flex w-full">
                      <div
                        onClick={handleSelectImages}
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
                      <div className="group relative grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90">
                        <div className="absolute z-[-1] size-full scale-75 rounded-full bg-content-hover opacity-0 duration-75 ease-linear group-hover:scale-100 group-hover:opacity-100"></div>
                        <Icon name="create_thread_modal_add_poll_black" className="dark:hidden" size={24} />
                        <Icon name="create_thread_modal_add_poll_white" className="hidden dark:block" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full pt-2 opacity-50">
                <div className="flex h-[21px] w-full items-center gap-3">
                  <div className="flex h-full w-9 justify-center">
                    <div className="size-4 overflow-hidden rounded-full border">
                      <Image
                        src={'/images/user.jpg'}
                        className="size-full object-cover"
                        width={500}
                        height={500}
                        alt=""
                      />
                    </div>
                  </div>
                  <span className="mb-0.5 block cursor-not-allowed">Add to thread</span>
                </div>
              </div>
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
