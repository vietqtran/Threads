'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import SimpleBar from 'simplebar-react'
import Icon from '../Icon'
import { useClickOutside } from '@/hooks/useClickOutside'

type Props = {
  title: string
  items?: {
    id: string
    title: string
    isActive: boolean
    onClick: () => void
  }[]
  children: React.ReactNode
}

const PageSectionWrapper = ({ title, children, items }: Props) => {
  const [openOptions, setOpenOptions] = React.useState<boolean>(false)
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false)
  const optionsRef = useClickOutside(() => {
    setOpenOptions(false)
  })
  const dropdownRef = useClickOutside(() => {
    setOpenDropdown(false)
  })

  return (
    <main className="flex size-full justify-center">
      <div className="min-w-[76px]"></div>
      <div className="flex h-full w-full min-w-[418px] max-w-[640px] justify-center">
        <div className="h-full w-full">
          <div className="relative z-10 grid h-15 w-full place-items-center">
            <div className="flex items-center gap-3">
              <span className="block text-15px font-medium">{title}</span>
              {items && items.length > 0 && (
                <div ref={dropdownRef} className="relative">
                  <div
                    onClick={e => {
                      e.stopPropagation()
                      setOpenDropdown(!openDropdown)
                    }}
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
                        className="absolute -left-[110px] top-[calc(100%+6px)] z-[999] w-60 origin-top rounded-2xl border bg-content p-2 shadow"
                      >
                        {items?.map((item, index) => (
                          <div
                            key={`home-main-section-${index}`}
                            onClick={() => {
                              item.onClick()
                              setOpenDropdown(false)
                            }}
                            className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                          >
                            <div className="flex h-7 w-full items-center justify-between gap-2">
                              <span className="font-medium">{item.title}</span>
                              {item.isActive && (
                                <div>
                                  <Icon name="check_home_select_section_black" className="dark:hidden" size={16} />
                                  <Icon
                                    name="check_home_select_section_white"
                                    className="hidden dark:block"
                                    size={16}
                                  />
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
            <div className="absolute right-3 top-1/2 size-12 -translate-y-1/2">
              <div ref={optionsRef} className="relative grid size-full place-items-center">
                <div
                  onClick={e => {
                    e.stopPropagation()
                    setOpenOptions(!openOptions)
                  }}
                  className="grid size-6 cursor-pointer place-items-center rounded-full border bg-content duration-75 ease-linear hover:scale-110 active:scale-95"
                >
                  <Icon name="home_section_header_dots_white" size={12} className="hidden dark:block" />
                  <Icon name="home_section_header_dots_black" size={12} className="dark:hidden" />
                </div>

                <AnimatePresence>
                  {openOptions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={e => e.stopPropagation()}
                      className="absolute right-0 top-[calc(100%-4px)] z-[999] w-[224px] origin-top-right rounded-2xl border bg-content p-2 shadow"
                    >
                      <div onClick={() => {}} className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                        <div className="flex h-7 w-full items-center justify-between gap-2">
                          <span className="font-medium">Pin to Home</span>
                          <div>
                            <Icon className="hidden dark:block" size={20} name="pin_active_white" />
                            <Icon className="dark:hidden" size={20} name="pin_active_black" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <SimpleBar className="!z-0 h-full max-h-[calc(100%-60px)] w-full overflow-auto rounded-t-3xl border border-b-0 bg-content shadow">
            {children}
          </SimpleBar>
        </div>
      </div>
      <div className="min-w-[76px]"></div>
    </main>
  )
}

export default PageSectionWrapper
