import React, { memo } from 'react'

import Icon from '../../Icon'
import Image from 'next/image'
import Link from 'next/link'
import SimpleBar from 'simplebar-react'
import { motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import { v4 as uuidv4 } from 'uuid'
import { useHomeStore } from '@/providers/StoresProvider'
import { HOME_SECTION } from '@/enums/home'

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
            className="absolute bottom-1 left-1 h-[486px] w-[388px] origin-bottom-left rounded-2xl border bg-content shadow duration-75 ease-out"
        >
            <div className="flex h-full w-full flex-col">
                <div className="flex h-12 w-full shrink-0 items-center justify-center">
                    <span className="text-15px font-medium">Pin to home</span>
                </div>
                <div className="h-14 w-full flex-shrink-0 px-4 py-1">
                    <div className="flex size-full items-center overflow-hidden rounded-2xl border bg-background">
                        <div className="flex h-full w-10 flex-shrink-0 items-center pl-3.5">
                            <Icon className="hidden dark:block" name="search_white" size={16} />
                            <Icon className="dark:hidden" name="search_black" size={16} />
                        </div>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            className="h-full flex-1 bg-background pt-0.5 text-15px placeholder:font-normal placeholder:text-description focus:outline-none"
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
                {searchValue && (
                    <SimpleBar className="h-full flex-1 overflow-auto">
                        <div className="mx-2 h-[1000px]">
                            <div className="cursor-pointer rounded-2xl p-4 hover:bg-content-hover">
                                <div className="flex min-h-9 items-center gap-3">
                                    {/* <div className="grid h-9 w-9 flex-shrink-0 place-items-center">
                  <Icon className="hidden dark:block" name="search_white" size={16} />
                  <Icon className="dark:hidden" name="search_black" size={16} />
                </div>
                <span className="block flex-1 truncate text-15px font-medium">search content</span> */}
                                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center">
                                        <Image
                                            src={'/images/user.jpg'}
                                            className="h-full w-full rounded-full border object-cover"
                                            alt=""
                                            width={500}
                                            height={500}
                                            priority
                                        />
                                    </div>
                                    <div className="flex-1 truncate">
                                        <span className="block w-full truncate text-15px font-medium leading-[21px]">
                                            search content
                                        </span>
                                        <span className="block truncate text-15px  leading-[21px] text-secondary">
                                            search content
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                )}
                {!searchValue && <MenuLinks />}
            </div>
        </motion.div>
    )
}

export default PinMenu

// eslint-disable-next-line react/display-name
export const MenuLinks = memo(({}) => {
    const { pinSection, setMainSection } = useHomeStore(state => state)

    return (
        <div className="h-auto w-full p-2">
            <div
                onClick={() => {
                    pinSection({
                        id: uuidv4(),
                        title: 'For you',
                        sectionType: HOME_SECTION.FOR_YOU
                    })
                }}
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">For you</span>
                </div>
            </div>
            <div
                onClick={() => {
                    pinSection({
                        id: uuidv4(),
                        title: 'Following',
                        sectionType: HOME_SECTION.FOLLOWING
                    })
                }}
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">Following</span>
                </div>
            </div>
            <div
                onClick={() =>
                    pinSection({
                        id: uuidv4(),
                        title: 'Liked',
                        sectionType: HOME_SECTION.LIKED
                    })
                }
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">Liked</span>
                </div>
            </div>
            <div
                onClick={() =>
                    pinSection({
                        id: uuidv4(),
                        title: 'Saved',
                        sectionType: HOME_SECTION.SAVED
                    })
                }
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">Saved</span>
                </div>
            </div>
            <div
                onClick={() =>
                    pinSection({
                        id: uuidv4(),
                        title: 'Search',
                        sectionType: HOME_SECTION.SEARCH
                    })
                }
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">Search</span>
                </div>
            </div>
            <div
                onClick={() =>
                    pinSection({
                        id: uuidv4(),
                        title: 'Activity',
                        sectionType: HOME_SECTION.ACTIVITY
                    })
                }
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">Activity</span>
                </div>
            </div>
            <div
                onClick={() =>
                    pinSection({
                        id: uuidv4(),
                        title: 'Profile',
                        sectionType: HOME_SECTION.PROFILE
                    })
                }
                className="block w-full rounded-xl p-3 hover:bg-content-hover"
            >
                <div className="flex h-7 w-full cursor-pointer items-center">
                    <span className="block text-15px font-medium">Profile</span>
                </div>
            </div>
        </div>
    )
})
