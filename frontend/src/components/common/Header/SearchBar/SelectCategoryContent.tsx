import { HEADER_FLYOUT } from '@/constants/header'
import { useClickOutside } from '@/hooks'
import { RootState } from '@/store'
import { reset } from '@/store/header'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SelectCategoryContent = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const { flyout } = useSelector((state: RootState) => state.header)

  useClickOutside(contentRef, () => {
    dispatch(reset())
  })

  const handleClickOverlay = (e: React.MouseEvent) => {
    dispatch(reset())
  }

  const handleClickOverlayContent = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {flyout !== HEADER_FLYOUT.DEFAULT && (
        <motion.div
          onClick={handleClickOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className="fixed inset-x-0 top-0 z-10 h-full max-h-screen w-full bg-black/30"
        >
          {flyout === HEADER_FLYOUT.SELECT_CATEGORY && (
            <motion.div
              onClick={handleClickOverlayContent}
              initial={{ height: '0px' }}
              animate={{ height: '400px' }}
              exit={{ height: '0px' }}
              transition={{ duration: 0.15, ease: 'linear' }}
              className="w-full bg-white shadow-lg"
            >
              <div ref={contentRef} className="h-[400px] w-full"></div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SelectCategoryContent
