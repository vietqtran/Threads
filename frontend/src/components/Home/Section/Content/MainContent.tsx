import { MODAL } from '@/enums/modal'
import { useModalStore } from '@/providers/StoresProvider'
import Image from 'next/image'
import React from 'react'

const MainContent = () => {
  const { setModal } = useModalStore(state => state)

  return (
    <div className="py-2">
      <div className="flex h-[68px] w-full items-center gap-2 border-b px-6">
        <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border">
          <Image src="/images/user.jpg" className="h-full w-full object-cover" width={500} height={500} alt="" />
        </div>
        <div onClick={() => setModal(MODAL.CREATE_THREAD)} className="flex-1 cursor-text">
          <span className="font-light text-secondary">Start a thread...</span>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => setModal(MODAL.CREATE_THREAD)}
            className="h-9 rounded-lg border px-4 pt-0.5 font-medium duration-75 ease-linear active:scale-95"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainContent
