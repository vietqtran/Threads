'use client'

import React, { useState } from 'react'
import PageSectionWrapper from '../Common/Wrapper/PageSectionWrapper'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '../Common/Icon'
import CommonButton from '../Common/Button'
import Thread from './Thread'
import { useModalStore } from '@/providers/StoresProvider'
import { MODAL } from '@/enums/modal'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'

const Profile = () => {
  const [openOptions, setOpenOptions] = useState(false)
  const [tab, setTab] = React.useState<string>('threads')
  const { setModal } = useModalStore(state => state)
  const optionsRef = useClickOutside(() => {
    setOpenOptions(false)
  })

  return (
    <PageSectionWrapper title="Profile">
      <div className="size-full">
        <div className="size-full pt-5 px-6 mb-3 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="flex-1">
              <div className="w-full truncate text-2xl leading-[30px] font-bold">vietqtran</div>
              <div className="w-full truncate">Trần Quốc Việt</div>
            </div>
            <div className="flex-shrink-0 cursor-pointer size-[84px] ring-1 ring-border rounded-full overflow-hidden">
              <Image src={'/images/user.jpg'} width={5000} height={5000} alt="" className="size-full object-cover" />
            </div>
          </div>
          <div className="w-full pt-4 pb-3">
            <div className="size-full">
              | React | React Native
              <br />
              💻 | Web | Mobile
              <br />| Helping to learn programming
            </div>
          </div>

          <div className="h-9 w-full mb-[22px] flex items-center justify-between">
            <div className="text-description flex items-center gap-1">
              <div onClick={() => setModal(MODAL.VIEW_FOLLOW)} className="flex items-center cursor-pointer">
                <div className="relative w-8">
                  <div className="size-4 top-1/2 ring-1 ring-background -translate-y-1/2 absolute left-0 border rounded-full overflow-hidden">
                    <Image
                      src={'/images/user.jpg'}
                      width={100}
                      height={100}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="size-4 top-1/2 -translate-y-1/2 absolute ring-1 ring-background left-3 border rounded-full overflow-hidden">
                    <Image
                      src={'/images/user.jpg'}
                      width={100}
                      height={100}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                </div>
                <span className="cursor-pointer">999 followers</span>
              </div>
              <span>·</span>
              <Link target="_blank" href={'https://github.com/vietqtran'}>
                https://github.com/vietqtran
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Link
                target="_blank"
                className=" active:scale-90 duration-75 ease-linear size-9 grid place-items-center"
                href={'https://instagram.com/@vietq.tran'}
              >
                <Icon name="profile_header_insta_white" size={24} className="dark:block hidden" />
                <Icon name="profile_header_insta_black" size={24} className="dark:hidden" />
              </Link>
              <div ref={optionsRef} className="relative">
                <div
                  onClick={() => setOpenOptions(!openOptions)}
                  className="cursor-pointer active:scale-90 duration-75 ease-linear size-9 grid place-items-center"
                >
                  <Icon name="profile_header_options_white" size={24} className="dark:block hidden" />
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

          <div className="w-full flex items-center gap-2.5">
            <CommonButton variant="white" className="w-full" title="Edit profile" />
            <CommonButton variant="white" className="w-full" title="Edit profile" />
          </div>
        </div>

        <div className="size-full grid grid-cols-3">
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
          <Thread />
          <Thread withPath />
          <Thread />
        </div>
      </div>
    </PageSectionWrapper>
  )
}

export default Profile
