import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import SimpleBar from 'simplebar-react'
import Icon from '../Icon'
import { useClickOutside } from '@/hooks/useClickOutside'

type Props = {
  title: string
  children: React.ReactNode
}

const PageSectionWrapper = ({ title, children }: Props) => {
  const [openOptions, setOpenOptions] = React.useState<boolean>(false)
  const optionsRef = useClickOutside(() => {
    setOpenOptions(false)
  })

  return (
    <main className="size-full flex justify-center">
      <div className="min-w-[76px]"></div>
      <div className="flex h-full w-full min-w-[418px] max-w-[640px] justify-center">
        <div className="h-full w-full">
          <div className="z-10 relative grid h-15 w-full place-items-center">
            <div className="flex items-center gap-2">
              <span className="block text-15px font-medium">{title}</span>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 size-12">
              <div ref={optionsRef} className="size-full relative grid place-items-center">
                <div
                  onClick={e => {
                    e.stopPropagation()
                    setOpenOptions(!openOptions)
                  }}
                  className="grid place-items-center size-6 border rounded-full bg-content duration-75 ease-linear hover:scale-110 active:scale-95 cursor-pointer"
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
