import Image from 'next/image'
import React from 'react'
import SimpleBar from 'simplebar-react'
import Icon from '../Icon'

const CreateThread = () => {
  return (
    <div onClick={e => e.stopPropagation()} className="w-full max-w-[668px]">
      <div className="flex h-[46px] w-full items-center justify-center">
        <span className="text-base font-bold text-white">New thread</span>
      </div>
      <div className="mb-4 mt-2 w-full px-6">
        <div className="flex size-full max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-2xl bg-content dark:border">
          <SimpleBar className="hide-scrollbar w-full overflow-auto">
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
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-secondary focus:outline-none"
                    placeholder="Start a thread..."
                  />
                  <div className="mt-1 w-full">
                    <div className="relative -left-2 flex w-full">
                      <div className="group relative grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90">
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
              <div className="w-full pt-2 opacity-20">
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
                  <span className="mb-0.5 block cursor-not-allowed ">Add to thread</span>
                </div>
              </div>
            </div>
          </SimpleBar>
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
