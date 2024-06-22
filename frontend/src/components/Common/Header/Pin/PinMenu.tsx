import React, { useRef } from 'react'

import Icon from '../../Icon'
import { motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PinMenu = ({ setIsOpen }: Props) => {
  const ref = useClickOutside(() => {
    setIsOpen(false)
  })
  const [searchValue, setSearchValue] = React.useState<string>('')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      ref={ref}
      className="absolute bottom-1 left-1 w-[388px] origin-bottom-left overflow-hidden rounded-2xl border bg-content shadow duration-75 ease-out"
    >
      <div className="flex w-full flex-col">
        <div className="grid h-12 w-full place-items-center">
          <span className="text-15px font-medium">Pin to home</span>
        </div>
        <div className="h-14 w-full px-4 py-1">
          <div className="flex size-full items-center overflow-hidden rounded-2xl border bg-background">
            <div className="flex h-full w-10 flex-shrink-0 items-center pl-3.5">
              <Icon className="hidden dark:block" name="search_white" size={16} />
              <Icon className="dark:hidden" name="search_black" size={16} />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="h-full flex-1 bg-background pt-0.5 text-15px placeholder:font-normal placeholder:text-[#999999] focus:outline-none dark:placeholder:text-[#777777]"
              placeholder="Search keywords and profiles"
            />
            {searchValue && (
              <div className="grid aspect-square h-full flex-shrink-0 place-items-center">
                <div className="cursor-pointer p-1">
                  <Icon className="hidden dark:block" name="clear_input_white" size={16} />
                  <Icon className="dark:hidden" name="clear_input_black" size={16} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-auto w-full p-2">
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">For you</span>
            </div>
          </div>
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">Following</span>
            </div>
          </div>
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">Liked</span>
            </div>
          </div>
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">Saved</span>
            </div>
          </div>
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">Search</span>
            </div>
          </div>
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">Activity</span>
            </div>
          </div>
          <div className="w-full rounded-xl p-3 hover:bg-content-hover">
            <div className="flex h-7 w-full cursor-pointer items-center">
              <span className="block text-15px font-medium">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PinMenu
