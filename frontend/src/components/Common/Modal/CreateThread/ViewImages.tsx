import Image from 'next/image'
import React, { memo } from 'react'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Icon from '../../Icon'

interface Props {
  images: {
    id: string
    file: File
  }[]
  handleRemoveImage: (id: string) => void
}

const ViewImages = ({ images, handleRemoveImage }: Props) => {
  return (
    <div className={`mt-3 w-full ${images && images.length > 0 ? '' : 'hidden'}`}>
      <Swiper
        id={'create-thread-image-swiper'}
        modules={[FreeMode]}
        spaceBetween={0}
        slidesPerView={'auto'}
        freeMode={true}
        className={`h-[350px]`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`create-thread-image-${index}`} className="mr-1.5 h-full max-w-fit">
            <div className="relative h-full w-fit cursor-pointer overflow-hidden rounded-lg border">
              <Image
                src={URL.createObjectURL(image.file)}
                className="h-full w-auto object-cover"
                width={2000}
                height={2000}
                alt=""
              />
              <div
                onClick={() => handleRemoveImage(image.id)}
                className="absolute right-3 top-3 grid aspect-square size-[26px] place-items-center rounded-full bg-black/40 duration-75 ease-linear hover:scale-105 active:scale-95"
              >
                <Icon size={12} className="cursor-pointer" name="create_thread_remove_image_white" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default memo(ViewImages)
