import Fixed from '@/components/Common/Fixed'
import ShowPosition from '@/components/Common/Wrapper/ShowPosition'
import { ThreadAudience } from '@/types/thread'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'

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

    const [audience, setAudience] = useState<ThreadAudience>(ThreadAudience.ANYONE)

    const displayText = useMemo(() => {
        setIsFixedOpen(false)
        switch (audience) {
            case ThreadAudience.ANYONE:
                return 'Anyone can reply & quote'
            case ThreadAudience.FOLLOWED:
                return 'Only people you follow can reply & quote'
            case ThreadAudience.MENTIONED:
                return 'Only people you mention can reply & quote'
        }
    }, [audience])

    return (
        <div>
            <span onClick={handleOpenFixed} className="block cursor-pointer text-secondary active:opacity-75">
                {displayText}
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
                                <div
                                    onClick={() => setAudience(ThreadAudience.ANYONE)}
                                    className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                                >
                                    <div className="flex h-5 items-center">
                                        <span className="font-medium">Anyone</span>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setAudience(ThreadAudience.FOLLOWED)}
                                    className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                                >
                                    <div className="flex h-5 items-center">
                                        <span className="font-medium">Profiles you follow</span>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setAudience(ThreadAudience.MENTIONED)}
                                    className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                                >
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
