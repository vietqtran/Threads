import React, { useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { useDragControls, useMotionValue, useAnimate, motion } from 'framer-motion'
import { useModalStore } from '@/providers/StoresProvider'

type Props = {
  children: React.ReactNode
}

const DragToCloseDrawer = ({ children }: Props) => {
  const { closeViewThreadMedias } = useModalStore(state => state)
  const [scope, animate] = useAnimate()
  const [drawerRef, { height }] = useMeasure()
  const y = useMotionValue(0)
  const controls = useDragControls()
  const handleClose = async () => {
    animate(scope.current, {})
    const yStart = typeof y.get() === 'number' ? y.get() : 0
    closeViewThreadMedias()
    await animate('#drawer', {
      y: [yStart, height],
      opacity: [1, 0]
    })
  }
  const opacity = useMemo(() => {
    return 1 - y.get() / height
  }, [y, height])
  return (
    <>
      <div ref={scope} onClick={handleClose}>
        <motion.div
          id="drawer"
          ref={drawerRef}
          onClick={e => e.stopPropagation()}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ ease: 'linear' }}
          className={`fixed size-full inset-0`}
          style={{ y, opacity }}
          drag="y"
          dragControls={controls}
          onDragEnd={() => {
            if (y.get() >= 100) {
              handleClose()
            }
          }}
          dragListener={false}
          dragConstraints={{
            top: 0,
            bottom: 0
          }}
          dragElastic={{
            top: 0,
            bottom: 0.5
          }}
        >
          <div
            onPointerDown={e => {
              controls.start(e)
            }}
            className="relative z-0 h-full overflow-y-scroll p-4 pt-12"
          >
            {children}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default DragToCloseDrawer
