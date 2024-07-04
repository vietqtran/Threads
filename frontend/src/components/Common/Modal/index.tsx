'use client'

import React from 'react'
import { useModalStore } from '@/providers/StoresProvider'
import { MODAL } from '@/enums/modal'
import { AnimatePresence, motion } from 'framer-motion'
import CreateThread from './CreateThread'
import ViewThreadMedias from './ViewThreadMedias'

const Modal = () => {
  const { modal, setModal } = useModalStore(state => state)

  return modal === MODAL.DEFAULT ? null : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setModal(MODAL.DEFAULT)}
        className="fixed inset-0 z-[999999] grid size-full place-items-center bg-black/80"
      >
        {modal === MODAL.CREATE_THREAD && <CreateThread />}
        {modal === MODAL.VIEW_THREAD_IMAGES && <ViewThreadMedias />}
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal
