import Fixed from '@/components/Common/Fixed'
import ShowPosition from '@/components/Common/Wrapper/ShowPosition'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

interface Props {}

const Audience = (props: Props) => {
  const [isFixedOpen, setIsFixedOpen] = useState(false)
  const [fixedPosition, setFixedPosition] = useState({ top: 0, left: 0 })

  const handleOpenFixed = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setFixedPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    })
    setIsFixedOpen(!isFixedOpen)
  }
  return (
    <div>
      <span onClick={handleOpenFixed} className="block cursor-pointer text-secondary">
        Anyone can reply & quote
      </span>
      <AnimatePresence>
        {isFixedOpen && (
          <Fixed
            translateLeft={-16}
            translateTop={4}
            isOpen={isFixedOpen}
            position={fixedPosition}
            onClose={() => setIsFixedOpen(false)}
          >
            <div className="relative">
              <ShowPosition
                bottom="bottom-8"
                className="w-[200px] origin-top-left rounded-2xl border bg-content p-2 shadow"
              >
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-5 items-center">
                    <span className="font-medium">Anyone</span>
                  </div>
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-5 items-center">
                    <span className="font-medium">Profiles you follow</span>
                  </div>
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-5 items-center">
                    <span className="font-medium">Mentioned only</span>
                  </div>
                </div>
              </ShowPosition>
            </div>
          </Fixed>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Audience
