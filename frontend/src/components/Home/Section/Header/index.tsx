import Icon from '@/components/Common/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

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
  const dropdownRef = useClickOutside(() => {
    setOpenDropdown(false)
  })

  return (
    <div className="z-10 grid h-15 w-full place-items-center">
      <div className="flex items-center gap-2">
        <span className="block text-15px font-medium">{title}</span>
        {isMain && (
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
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
                  className="absolute -left-[100px] top-[calc(100%+6px)] z-[999] w-[224px] origin-top rounded-2xl border bg-content p-2 shadow"
                >
                  {items?.map((item, index) => (
                    <div
                      key={`home-main-section-${index}`}
                      onClick={() => {
                        item.onClick?.()
                        setOpenDropdown(false)
                      }}
                      className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
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
    </div>
  )
}

export default SectionHeader
