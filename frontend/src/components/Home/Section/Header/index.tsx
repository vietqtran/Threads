import Icon from '@/components/Common/Icon'
import { Switch } from '@/components/ui/switch'
import { useClickOutside } from '@/hooks/useClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef } from 'react'
import {v4 as uuidv4} from 'uuid'

interface Props {
  title: string
  items?: {
    title: string
    isActive: boolean
    onClick?: () => void
  }[]
  isMain: boolean
}

const SectionHeader = ({ title, items, isMain }: Props) => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false)
  const [openOptions, setOpenOptions] = React.useState<boolean>(false)
  const dropdownRef = useClickOutside(() => {
    setOpenDropdown(false)
  })
  const optionsRef = useClickOutside(() => {
    setOpenOptions(false)
  })
  const switchRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="z-10 relative grid h-15 w-full place-items-center">
      <div className="flex items-center gap-2">
        <span className="block text-15px font-medium">{title}</span>
        {isMain && (
          <div ref={dropdownRef} className="relative">
            <div
              onClick={(e) => { 
                e.stopPropagation()
                setOpenDropdown(!openDropdown)}}
              className="grid h-[24px] w-[24px] cursor-pointer place-items-center rounded-full border bg-content shadow duration-75 ease-linear hover:scale-110 active:scale-95"
            >
              <Icon name="arrow_down_home_section_black" className="dark:hidden" size={12} />
              <Icon name="arrow_down_home_section_white" className="hidden dark:block" size={12} />
            </div>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={e => e.stopPropagation()}
                  className="absolute -left-[100px] top-[calc(100%+6px)] z-[999] w-[224px] origin-top rounded-2xl border bg-content p-2 shadow"
                >
                  {items?.map((item, index) => (
                    <div
                      key={`home-main-section-${index}`}
                      onClick={() => {
                        item.onClick?.()
                        setOpenDropdown(false)
                      }}
                      className="cursor-pointer rounded-xl p-3 hover:bg-content-hovec
                    >
                      <div className="flex h-7 w-full items-center justify-between gap-2">
                        <span className="font-medium">{item.title}</span>
                        {item.isActive && (
                          <div>
                            <Icon name="check_home_select_section_black" className="dark:hidden" size={16} />
                            <Icon name="check_home_select_section_white" className="hidden dark:block" size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

        {!isMain && <div className='absolute right-3 top-1/2 -translate-y-1/2 size-12'>
          <div 
                ref={optionsRef}
          className='size-full relative grid place-items-center'>
            <div onClick={(e) => {
              e.stopPropagation()
              setOpenOptions(!openOptions)}} className='grid place-items-center size-6 border rounded-full bg-content duration-75 ease-linear hover:scale-110 active:scale-95 cursor-pointer'>
              <Icon name='home_section_header_dots_white' size={12} className='hidden dark:block' />
              <Icon name='home_section_header_dots_black' size={12} className='dark:hidden' />
            </div>

            <AnimatePresence>
                {openOptions && <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={e => e.stopPropagation()}
                  className="absolute right-0 top-[calc(100%-4px)] z-[999] w-[224px] origin-top-right rounded-2xl border bg-content p-2 shadow"
                >
                   <div
                      onClick={() => {
                        switchRef.current?.click()
                      }}
                      className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                    >
                      <div className="flex h-7 w-full items-center justify-between gap-2">
                        <span className="font-medium">Auto-update</span>
                        <div>
                          <Switch ref={switchRef} id={uuidv4()} />
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                      }}
                      className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                    >
                      <div className="flex h-7 w-full items-center justify-between gap-2">
                        <span className="font-medium">Unpin</span>
                        <div>
                          <Icon
                            className="hidden dark:block"
                            size={20}
                            name="unpin_white"
                          />
                          <Icon
                            className="dark:hidden"
                            size={20}
                            name="unpin_black"
                          />
                        </div>
                      </div>
                    </div>
                </motion.div>}
            </AnimatePresence>

          </div>
        </div>}
    </div>
  )
}

export default SectionHeader
