import React, { useEffect, useRef, useState } from 'react'

import CommonButton from '../Button'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const CommonUsername = (props: Props) => {
    const [isHover, setIsHover] = useState(false)
    const [showAbove, setShowAbove] = useState(false)
    const nameRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseEnter = () => {
            setIsHover(true)
            if (nameRef.current) {
                const rect = nameRef.current.getBoundingClientRect()
                const windowHeight = window.innerHeight
                setShowAbove(rect.bottom > (windowHeight * 2) / 3)
            }
        }

        const handleMouseLeave = () => {
            setIsHover(false)
        }

        const element = nameRef.current
        if (element) {
            element.addEventListener('mouseenter', handleMouseEnter)
            element.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            if (element) {
                element.removeEventListener('mouseenter', handleMouseEnter)
                element.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <div ref={nameRef} className="relative">
            <Link href={'/@username'} className={`font-semibold ${isHover ? 'underline' : ''}`}>
                vietqtran
            </Link>
            {isHover && (
                <div
                    className={`absolute z-[999999] w-[340px] bg-content border rounded-xl ${showAbove ? 'bottom-full' : 'top-full'} -left-6 p-6 shadow`}
                >
                    <Link href="/@username" className="flex w-full items-center justify-between">
                        <div className="flex-1">
                            <div className="w-full truncate text-xl font-bold leading-[30px]">vietqtran</div>
                            <div className="w-full truncate">Trần Quốc Việt</div>
                        </div>
                        <div className="size-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-full ring-1 ring-border">
                            <Image
                                src={'/images/user.jpg'}
                                width={5000}
                                height={5000}
                                alt=""
                                className="size-full object-cover"
                            />
                        </div>
                    </Link>
                    <div className="w-full pb-3 pt-2">
                        <div className="line-clamp-3 size-full truncate">
                            | React | React Native
                            <br />
                            💻 | Web | Mobile
                            <br />| Helping to learn programming
                        </div>
                    </div>
                    <div className="text-description">999 followers</div>
                    <CommonButton variant="reverse" className="mt-3 w-full" title="Follow" />
                </div>
            )}
        </div>
    )
}

export default CommonUsername
