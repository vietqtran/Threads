'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import CreateThread from './CreateThread'
import DragToCloseDrawer from '../Drawer/DragToCloseDrawer'
import { MODAL } from '@/enums/modal'
import ViewThreadMedias from './ViewThreadMedias'
import { useModalStore, useUserStore } from '@/providers/StoresProvider'
import { CreateThreadProvider } from '@/providers/CreateThreadProvider'
import ViewFollow from './ViewFollow'

const Modal = () => {
    const { modal, setModal } = useModalStore(state => state)
    const { user } = useUserStore(state => state)
    return modal === MODAL.DEFAULT ? null : (
        <AnimatePresence>
            {modal === MODAL.CREATE_THREAD && !!user && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setModal(MODAL.DEFAULT)}
                    className="fixed inset-0 z-[999999] grid size-full place-items-center bg-black/80"
                >
                    <CreateThreadProvider>
                        <CreateThread />
                    </CreateThreadProvider>
                </motion.div>
            )}
            {modal === MODAL.VIEW_THREAD_IMAGES && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setModal(MODAL.DEFAULT)}
                    className="fixed inset-0 z-[999999] grid size-full place-items-center bg-black/80"
                >
                    <DragToCloseDrawer>
                        <ViewThreadMedias />
                    </DragToCloseDrawer>
                </motion.div>
            )}
            {modal === MODAL.VIEW_FOLLOW && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setModal(MODAL.DEFAULT)}
                    className="fixed inset-0 z-[999999] grid size-full place-items-center bg-black/80"
                >
                    <ViewFollow />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
