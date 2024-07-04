import { useModalStore } from '@/providers/StoresProvider'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ViewThreadMedias = () => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowY = 'hidden'
      document.body.style.overflowX = 'auto'
    }
  }, [])

  const { threadMedias } = useModalStore(state => state)

  return (
    <div onClick={e => e.stopPropagation()} className="fixed z-[999999] bg-background inset-0">
      <div className="size-full relative">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          onSlideChange={index => console.log(index)}
          initialSlide={threadMedias.openIndex}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper size-full"
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
  )
}

export default ViewThreadMedias
