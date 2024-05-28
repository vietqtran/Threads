import React from 'react'
import SelectCategoryButton from './SelectCategoryButton'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { reset, setFlyout } from '@/store/header'
import { HEADER_FLYOUT } from '@/constants/header'
import { RootState } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'

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
      <div
        className={`flex size-full ${flyout === HEADER_FLYOUT.FOCUS_INPUT ? 'rounded-t-lg rounded-l-lg border' : 'rounded-lg border'}`}
      >
        <SelectCategoryButton />

        <div className="relative size-full flex-1 items-center rounded-r-lg border-l">
          <Input
            type="text"
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            placeholder="Search EcomMERN"
            className="size-full text-xs"
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
      </div>
    </div>
  )
}

export default SearchBar
