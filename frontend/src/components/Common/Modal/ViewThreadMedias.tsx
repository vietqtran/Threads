'use client'

import { useModalStore } from '@/providers/StoresProvider'
import Image from 'next/image'
import React, { useEffect, useId } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ViewThreadMedias = () => {
  const postId = 'postid'
  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowY = 'hidden'
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const { threadMedias, closeViewThreadMedias } = useModalStore(state => state)

  const [isEnd, setIsEnd] = React.useState(false)
  const [isStart, setIsStart] = React.useState(false)

  return (
    <div onClick={e => e.stopPropagation()} className="fixed bg-[#181818] z-[999999] inset-0">
      <div className="size-full bg-transparent relative">
      <div className="absolute left-0 top-0 z-10 p-5">
            <div
            onClick={closeViewThreadMedias}
               className="cursor-pointer rounded-full bg-white bg-opacity-10 p-3 duration-100 ease-linear hover:scale-105 active:scale-100"
            >
               <svg
                  className="scale-75"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M13.3491 11.9946L23.4795 1.85429C23.6582 1.67469 23.7584 1.43158 23.7583 1.17821C23.7581 0.924834 23.6575 0.681856 23.4786 0.502491C23.1204 0.146091 22.4895 0.144291 22.1277 0.504291L12 10.6446L1.86868 0.501591C1.50868 0.146091 0.877776 0.147891 0.519576 0.503391C0.430667 0.591945 0.360285 0.697321 0.312538 0.813367C0.26479 0.929414 0.240633 1.05381 0.241476 1.17929C0.241476 1.43489 0.340476 1.67429 0.519576 1.85159L10.65 11.9937L0.520476 22.1367C0.341723 22.3166 0.24162 22.56 0.242126 22.8136C0.242632 23.0672 0.343707 23.3102 0.523177 23.4894C0.696877 23.6613 0.942576 23.7603 1.19638 23.7603H1.20178C1.45648 23.7594 1.70218 23.6595 1.87228 23.4858L12 13.3455L22.1313 23.4885C22.3104 23.6667 22.5498 23.7657 22.8036 23.7657C22.9291 23.7661 23.0534 23.7416 23.1694 23.6937C23.2854 23.6459 23.3908 23.5755 23.4796 23.4868C23.5683 23.3981 23.6387 23.2927 23.6865 23.1766C23.7344 23.0606 23.7588 22.9363 23.7585 22.8108C23.7585 22.5561 23.6595 22.3158 23.4795 22.1385L13.3491 11.9946Z"
                     fill="gray"
                  />
               </svg>
            </div>
         </div>
        <button
          onClick={e => e.stopPropagation()}
          className={`custom-swiper-button-next-${postId} ${isEnd ? 'opacity-30 cursor-not-allowed' : ''} absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:place-items-center rounded-full bg-white bg-opacity-[.15] stroke-2 size-14 duration-100 ease-linear hover:scale-110 active:scale-90 md:grid`}
        >
          <span className="relative">
            <svg
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[25px] w-[25px] -rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
            >
              <path
                fill="#777777"
                d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={e => e.stopPropagation()}
          className={`custom-swiper-button-prev-${postId} ${isStart ? 'opacity-30 cursor-not-allowed' : ''} absolute  z-10 hidden top-1/2 left-4 -translate-y-1/2 place-items-center rounded-full bg-white bg-opacity-[.15] stroke-2 p-7 duration-100 ease-linear hover:scale-110 active:scale-90 md:grid`}
        >
          <span className="relative">
            <svg
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute h-[25px] w-[25px] rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
            >
              <path
                fill="#777777"
                d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
              />
            </svg>
          </span>
        </button>
        <div className="size-full relative container mx-auto p-0">
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={0}
            onSlideChange={swiper => {
              swiper.on('slideChange', () => {
                setIsEnd(swiper.isEnd)
                setIsStart(swiper.isBeginning)
              })
            }}
            initialSlide={threadMedias.openIndex}
            navigation={{
              prevEl: `.custom-swiper-button-prev-${postId}`,
              nextEl: `.custom-swiper-button-next-${postId}`
            }}
            modules={[Navigation]}
            className="mySwiper size-full"
            onSwiper={swiper => {
              swiper.on('slideChange', () => {
                setIsEnd(swiper.isEnd)
                setIsStart(swiper.isBeginning)
              })
            }}
          >
            {threadMedias.medias.map((item, index) => (
              <SwiperSlide key={`view-thread-media-${index}`} className="h-full w-full">
                <div className="w-full h-full duration-100 ease-linear">
                  <Image width={5000} height={5000} className="size-full object-contain" src={item} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute size-full"></div>
        </div>
      </div>
    </div>
  )
}

export default ViewThreadMedias
