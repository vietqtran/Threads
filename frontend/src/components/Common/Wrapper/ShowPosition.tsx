import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Props {
  className?: string
  children: React.ReactNode
  threshold?: number
  top?: string
  bottom?: string
}

const ShowPosition: React.FC<Props> = ({ className = '', children, threshold = 2 / 3, top, bottom }) => {
  const [showAbove, setShowAbove] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleSetPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        setShowAbove(rect.bottom > windowHeight * threshold)
      }
    }

    handleSetPosition()

    const observer = new ResizeObserver(handleSetPosition)
    if (ref.current) observer.observe(ref.current)

    window.addEventListener('scroll', handleSetPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleSetPosition)
    }
  }, [threshold])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(className, 'absolute', showAbove ? (bottom ?? 'bottom-full') : (top ?? 'top-full'))}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}

export default ShowPosition
