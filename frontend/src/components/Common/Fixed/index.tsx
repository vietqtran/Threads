import React, { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Props {
    children: React.ReactNode
    isOpen: boolean
    position: { top: number; left: number }
    onClose: () => void
    className?: string
    translateTop?: number
    translateLeft?: number
}

const Fixed: React.FC<Props> = ({
    children,
    isOpen,
    position,
    onClose,
    className = '',
    translateTop = 0,
    translateLeft = 0
}) => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            ref={contentRef}
            className={cn('fixed z-50 origin-top-left', className)}
            style={{ top: `${position.top + translateTop}px`, left: `${position.left + translateLeft}px` }}
        >
            {children}
        </motion.div>
    )
}

export default Fixed
