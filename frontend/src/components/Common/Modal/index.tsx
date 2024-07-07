'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'

import CreateThread from './CreateThread'
import DragToCloseDrawer from '../Drawer/DragToCloseDrawer'
import { MODAL } from '@/enums/modal'
import ViewThreadMedias from './ViewThreadMedias'
import { useModalStore } from '@/providers/StoresProvider'

const Modal = () => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowY = 'hidden'
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const { modal, setModal, closeViewThreadMedias } = useModalStore(state => state)

  return modal === MODAL.DEFAULT ? null : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setModal(MODAL.DEFAULT)}
        className="fixed inset-0 z-[999999] grid size-full place-items-center bg-black/80"
      >
        {modal === MODAL.CREATE_THREAD && <CreateThread />}
        {modal === MODAL.VIEW_THREAD_IMAGES && (
          <DragToCloseDrawer>
            <ViewThreadMedias />
          </DragToCloseDrawer>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal
