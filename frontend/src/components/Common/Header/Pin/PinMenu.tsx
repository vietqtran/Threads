import React from 'react'
import { motion } from 'framer-motion'
import Icon from '../../Icon'
import { useClickOutside } from '@/hooks/useClickOutside'

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PinMenu = ({setIsOpen}: Props) => {
    const ref = useClickOutside(() => {
        setIsOpen(false)
      })
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      ref={ref}
      className='absolute duration-75 ease-out bottom-1 left-1 origin-bottom-left overflow-hidden rounded-2xl border bg-content shadow w-[388px] h-fit'
    >
        <div className="w-full">
          <div className="w-full border-b p-2">
            <div
              className="flex w-full cursor-pointer items-center rounded-xl p-3 hover:bg-content-hover"
            >
              <div className="flex h-7 w-full items-center justify-between">
                <div className="flex flex-1 text-15px font-medium">Appearance</div>
                <div className="flex-shrink-0">
                  <Icon className="hidden dark:block" size={15} name="header_menu_arrow_right_white" />
                  <Icon className="dark:hidden" size={15} name="header_menu_arrow_right_black" />
                </div>
              </div>
            </div>
            <div className="flex w-full cursor-pointer items-center rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-7 w-full items-center justify-between">
                <div className="flex flex-1 text-15px font-medium">Settings</div>
              </div>
            </div>
          </div>
          <div className="w-full p-2">
            <div className="flex w-full cursor-pointer items-center rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-7 w-full items-center justify-between">
                <div className="flex flex-1 text-15px font-medium">Report a problem</div>
              </div>
            </div>
            <div className="flex w-full cursor-pointer items-center rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-7 w-full items-center justify-between">
                <div className="flex flex-1 text-15px font-medium">Log out</div>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

export default PinMenu