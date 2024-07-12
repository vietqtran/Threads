'use client'

import React from 'react'
import Icon from '../Icon'
import { useModalStore } from '@/providers/StoresProvider'
import { MODAL } from '@/enums/modal'

const AddThreadButton = () => {
  const { setModal } = useModalStore(state => state)
  return (
    <div
      onClick={() => setModal(MODAL.CREATE_THREAD)}
      className="w-20 active:scale-90 md:grid hidden cursor-pointer duration-75 ease-linear bg-content fixed bottom-6 right-6 rounded-2xl border shadow h-16 place-items-center"
    >
      <Icon name="layout_add_thread_black" size={24} className="dark:hidden" />
      <Icon name="layout_add_thread_white" size={24} className="hidden dark:block" />
    </div>
  )
}

export default AddThreadButton
