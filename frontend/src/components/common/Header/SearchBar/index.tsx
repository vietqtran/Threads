import { AnimatePresence, motion } from 'framer-motion'
import { reset, setFlyout } from '@/store/header'
import { useDispatch, useSelector } from 'react-redux'

import { HEADER_FLYOUT } from '@/constants/header'
import { Input } from '@/components/ui/input'
import React from 'react'
import { RootState } from '@/store'
import SelectCategoryButton from './SelectCategoryButton'

const SearchBar = () => {
  const dispatch = useDispatch()
  const { flyout } = useSelector((state: RootState) => state.header)

  const handleFocusInput = () => {
    dispatch(setFlyout(HEADER_FLYOUT.FOCUS_INPUT))
  }

  const handleBlurInput = () => {
    dispatch(reset())
  }

  return (
    <div className="flex size-full flex-1 items-center p-3">
      <div className="flex size-full rounded-lg border">
        <SelectCategoryButton />
        <div className="relative size-full flex-1 items-center rounded-r-lg border-l">
          <Input
            type="text"
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            placeholder="Search EcomMERN"
            className="size-full text-xs bg-gray-50"
          />
          <AnimatePresence>
            {flyout === HEADER_FLYOUT.FOCUS_INPUT && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '300px' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1, ease: 'linear' }}
                className="absolute top-[calc(100%+1px)] h-[300px] w-full overflow-hidden rounded-b-lg bg-white shadow-lg ring-1 ring-border"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="grid aspect-square h-full cursor-pointer place-items-center rounded-r-lg border-l bg-gray-100">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3226 13.3833C11.3996 14.0841 10.2484 14.5 9 14.5C5.96243 14.5 3.5 12.0376 3.5 9C3.5 5.96243 5.96243 3.5 9 3.5C12.0376 3.5 14.5 5.96243 14.5 9C14.5 10.2484 14.0841 11.3996 13.3833 12.3226L16.2803 15.2197C16.5732 15.5126 16.5732 15.9874 16.2803 16.2803C15.9874 16.5732 15.5126 16.5732 15.2197 16.2803L12.3226 13.3833ZM13 9C13 11.2091 11.2091 13 9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9Z"
              fill="#4A4A4A"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
