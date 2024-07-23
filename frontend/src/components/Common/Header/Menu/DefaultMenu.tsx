import React, { memo } from 'react'

import Icon from '../../Icon'
import SwitchTheme from './SwitchTheme'
import { motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DefaultMenu = ({ setIsOpen }: Props) => {
  const {logout} = useAuth()
  const ref = useClickOutside(() => {
    setIsOpen(false)
  })
  const [tab, setTab] = React.useState<string>('default')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      ref={ref}
      className={`absolute duration-75 ease-out bottom-1 left-1 origin-bottom-left overflow-hidden rounded-2xl border bg-content shadow ${tab === 'default' && 'h-[241px] w-60'} ${tab === 'appearance' && 'h-[116px] w-80'} `}
    >
      {tab === 'default' && (
        <div className="w-full">
          <div className="w-full border-b p-2">
            <div
              onClick={() => setTab('appearance')}
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
            <div onClick={logout} className="flex w-full cursor-pointer items-center rounded-xl p-3 hover:bg-content-hover">
              <div className="flex h-7 w-full items-center justify-between">
                <div className="flex flex-1 text-15px font-medium">Log out</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'appearance' && <SwitchTheme setTab={setTab} />}
    </motion.div>
  )
}

export default memo(DefaultMenu)
