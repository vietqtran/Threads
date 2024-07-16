'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '../Common/Icon'
import CommonButton from '../Common/Button'
import { useModalStore, useUserStore } from '@/providers/StoresProvider'
import { MODAL } from '@/enums/modal'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import Thread from '../Common/Thread'
import { User } from '@/types/user'

type Props = {
  user: User | null
  isCurrentUser: Boolean
}

const ProfileContent = ({ isCurrentUser, user }: Props) => {
  const userStore = useUserStore(state => state)
  const [openOptions, setOpenOptions] = useState(false)
  const [tab, setTab] = React.useState<string>('threads')
  const { setModal } = useModalStore(state => state)
  const optionsRef = useClickOutside(() => {
    setOpenOptions(false)
  })

  return (
    <div className="size-full">
      <div className="mb-3 flex size-full flex-col px-6 pt-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1">
            <div className="w-full truncate text-2xl font-bold leading-[30px]">{user?.username}</div>
            <div className="w-full truncate">{user?.name}</div>
          </div>
          <div className="size-[84px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src={user?.avatar ?? '/images/user.jpg'}
              width={500}
              height={500}
              alt=""
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="w-full pb-3 pt-4">
          <div className="size-full">
            | React | React Native
            <br />
            💻 | Web | Mobile
            <br />| Helping to learn programming
          </div>
        </div>

        <div className="mb-[22px] flex h-9 w-full items-center justify-between">
          <div className="text-description flex items-center gap-1">
            <div onClick={() => setModal(MODAL.VIEW_FOLLOW)} className="flex cursor-pointer items-center">
              <div className="relative w-8">
                <div className="absolute left-0 top-1/2 size-4 -translate-y-1/2 overflow-hidden rounded-full border ring-1 ring-background">
                  <Image src={'/images/user.jpg'} width={50} height={50} alt="" className="size-full object-cover" />
                </div>
                <div className="absolute left-3 top-1/2 size-4 -translate-y-1/2 overflow-hidden rounded-full border ring-1 ring-background">
                  <Image src={'/images/user.jpg'} width={50} height={50} alt="" className="size-full object-cover" />
                </div>
              </div>
              <span className="cursor-pointer whitespace-nowrap">{user?.followers.length} followers</span>
            </div>
            <span>·</span>
            <Link target="_blank" className="max-w-40 truncate" href={'https://github.com/vietqtran'}>
              {/* TODO */}
              github.com/vietqtran
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Link
              target="_blank"
              className="grid size-9 place-items-center duration-75 ease-linear active:scale-90"
              href={'https://instagram.com/@vietq.tran'}
            >
              <Icon name="profile_header_insta_white" size={24} className="hidden dark:block" />
              <Icon name="profile_header_insta_black" size={24} className="dark:hidden" />
            </Link>
            <div ref={optionsRef} className="relative">
              <div
                onClick={() => setOpenOptions(!openOptions)}
                className="grid size-9 cursor-pointer place-items-center duration-75 ease-linear active:scale-90"
              >
                <Icon name="profile_header_options_white" size={24} className="hidden dark:block" />
                <Icon name="profile_header_options_black" size={24} className="dark:hidden" />
              </div>
              <AnimatePresence>
                {openOptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={e => e.stopPropagation()}
                    className="absolute right-0 top-[calc(100%+6px)] z-[999] w-[224px] origin-top-right rounded-2xl border bg-content p-2 shadow"
                  >
                    <div
                      onClick={() => {
                        setOpenOptions(false)
                      }}
                      className="cursor-pointer rounded-xl p-3 hover:bg-content-hover"
                    >
                      <div className="flex h-5 w-full items-center justify-between gap-2">
                        <span className="font-medium text-[#FF3040]">Report</span>
                        <div>
                          <Icon name="profile_header_options_report_red" className="dark:hidden" size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-2.5">
          {isCurrentUser ? (
            <CommonButton variant="white" className="w-full" title="Edit profile" />
          ) : (
            <>
              {userStore.user?.following.includes(user?._id ?? '') ? (
                <CommonButton variant="white" className="w-full" title="Following" />
              ) : (
                <CommonButton variant="white" className="w-full" title="Follow" />
              )}
              <CommonButton variant="white" className="w-full" title="Mention" />
            </>
          )}
        </div>
      </div>

      <div className="grid size-full grid-cols-3">
        <div
          onClick={() => setTab('threads')}
          className={`col-span-1 cursor-pointer h-12 grid place-items-center font-semibold relative before:absolute before:w-full before:h-[1px] before:bottom-0 ${tab === 'threads' ? 'before:bg-black dark:before:bg-[#f3f5f7]' : 'before:bg-border text-description  dark:before:bg-[#f3f5f7'}`}
        >
          Threads
        </div>
        <div
          onClick={() => setTab('replies')}
          className={`col-span-1 cursor-pointer h-12 grid place-items-center font-semibold relative before:absolute before:w-full before:h-[1px] before:bottom-0 ${tab === 'replies' ? 'before:bg-black dark:before:bg-[#f3f5f7]' : 'before:bg-border text-description  dark:before:bg-[#f3f5f7'}`}
        >
          Replies
        </div>
        <div
          onClick={() => setTab('reposts')}
          className={`col-span-1 cursor-pointer h-12 grid place-items-center font-semibold relative before:absolute before:w-full before:h-[1px] before:bottom-0 ${tab === 'reposts' ? 'before:bg-black dark:before:bg-[#f3f5f7]' : 'before:bg-border text-description  dark:before:bg-[#f3f5f7'}`}
        >
          Reposts
        </div>
      </div>

      <div className="w-full">
        <Thread withPath />
        <Thread isReply />
        <Thread withPath />
        <Thread isReply />
      </div>
    </div>
  )
}

export default ProfileContent
