import Icon from '@/components/Common/Icon'
import Image from 'next/image'
import React, { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { useModalStore } from '@/providers/StoresProvider'
import Link from 'next/link'
import CommonAvatar from '@/components/Common/Avatar'

type Props = {
  withPath?: boolean
}

const Thread = ({ withPath = false }: Props) => {
  const swiperId = useId()
  const images = [
    '/images/post_portrait.jpg',
    '/images/post_landscape.png',
    '/images/post_portrait.jpg',
    '/images/post_landscape.png',
    '/images/post_portrait.jpg',
    '/images/post_portrait.jpg',
    '/images/post_landscape.png',
    '/images/post_portrait.jpg'
  ]
  const { setViewThreadMedias } = useModalStore(state => state)

  const handleViewMedia = (index: number) => {
    setViewThreadMedias(index, images)
  }

  return (
    <div className={`w-full relative pb-2 ${withPath ? 'pt-3' : 'border-b'}`}>
      <div className="size-full mb-2 px-6 flex items-start gap-3">
        <div className="w-[38px] flex-shrink-0 h-[38px] mt-1 relative rounded-full border">
          <Image
            src={'/images/user.jpg'}
            width={500}
            height={500}
            className="size-full cursor-pointer rounded-full object-cover"
            priority
            alt=""
          />
          <div className="cursor-pointer hover:scale-105 duration-75 ease-linear active:scale-90 absolute grid place-items-center rounded-full bg-black dark:bg-white -bottom-1 w-5 h-5 border-2 border-same-bg-content -right-1">
            <Icon name="home_thread_plus_white" size={10} className="dark:hidden" />
            <Icon name="home_thread_plus_black" size={10} className="hidden dark:block" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="w-full flex mb-1 items-center justify-between">
            <div className="flex-1 gap-1.5 flex items-center">
              <CommonAvatar />
              <div>
                <span className="text-secondary text-sm">23h</span>
              </div>
            </div>
            <div className="flex-shrink-0 relative group size-6 grid cursor-pointer active:scale-95 duration-75 ease-linear hover:scale-105 place-items-center">
              <Icon name="home_thread_dots_black" size={20} className="dark:hidden" />
              <Icon name="home_thread_dots_white" size={20} className="hidden dark:block" />
              <div className="absolute z-[-1] size-full inset-0 bg-content-hover rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 duration-75 ease-linear"></div>
            </div>
          </div>
          <div className="w-full">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mb-1.5">
        {/* > 2 landscape */}
        {/* <Swiper
            id={swiperId}
            modules={[FreeMode, Pagination]}
            spaceBetween={0}
            slidesPerView={'auto'}
            freeMode={true}
            className='h-[184px]'
        >
            <SwiperSlide className='max-w-[72px]'>
                <div className='max-w-[72px]'></div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 max-w-[245px] h-full'>
                <div className='border rounded-lg overflow-hidden h-full cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_landscape.png'} className='w-full h-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 max-w-[245px] h-full'>
                <div className='border rounded-lg overflow-hidden h-full cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_landscape.png'} className='w-full h-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 max-w-[245px] h-full'>
                <div className='border rounded-lg overflow-hidden h-full cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_landscape.png'} className='w-full h-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 max-w-[245px] h-full'>
                <div className='border rounded-lg overflow-hidden h-full cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_landscape.png'} className='w-full h-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 max-w-[245px] h-full'>
                <div className='border rounded-lg overflow-hidden h-full cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_landscape.png'} className='w-full h-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='max-w-6'>
                <div className='max-w-6'></div>
            </SwiperSlide>
        </Swiper> */}

        {/* > 2 portrait */}
        <Swiper
          id={swiperId}
          modules={[FreeMode]}
          spaceBetween={0}
          slidesPerView={'auto'}
          freeMode={true}
          className="h-[280px]"
        >
          <SwiperSlide className="max-w-[72px]">
            <div className="max-w-[72px]"></div>
          </SwiperSlide>
          {images.map((image, index) => (
            <SwiperSlide key={`thread-medias-${swiperId}-${index}`} className="mr-1.5 max-w-[210px] h-full">
              <div
                onClick={() => handleViewMedia(index)}
                className="border rounded-lg overflow-hidden h-full cursor-pointer active:scale-95 duration-75 ease-linear"
              >
                <Image src={image} className="w-full h-full object-cover" width={2000} height={2000} alt="" />
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className="max-w-6">
            <div className="max-w-6"></div>
          </SwiperSlide>
        </Swiper>

        {/* 
            TODO 
            Mix Landscape & portrait
        */}

        <div className="w-full flex">
          {/* <div className='w-[72px]'></div> */}
          <div className="flex-1">
            {/* With 1 Image */}
            {/* Portrait */}
            {/* <div className='max-w-64 max-h-[430px] border rounded-lg overflow-hidden cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_portrait.jpg'} className='max-w-64 max-h-[430px] object-cover' width={2000} height={2000} alt='' />
                </div> */}
            {/* Landscape */}
            {/* <div className='max-w-full max-h-[380px] border rounded-lg overflow-hidden cursor-pointer active:scale-95 duration-75 ease-linear'>
                    <Image src={'/images/post_landscape.png'} className='max-w-full max-h-[380px] object-cover' width={2000} height={2000} alt='' />
                </div> */}

            {/* With 2 images */}
            <div className="flex w-full gap-1.5">
              {/* 2 Portrait */}
              {/* <div className='w-1/2'>
                        <div className=' border rounded-lg overflow-hidden cursor-pointer active:scale-95 duration-75 ease-linear'>
                            <Image src={'/images/post_portrait.jpg'} className=' size-full object-cover' width={2000} height={2000} alt='' />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className=' border rounded-lg overflow-hidden cursor-pointer active:scale-95 duration-75 ease-linear'>
                            <Image src={'/images/post_portrait.jpg'} className='size-full object-cover' width={2000} height={2000} alt='' />
                        </div>
                    </div> */}
            </div>
          </div>
          {/* <div className='w-6'></div> */}
        </div>
      </div>

      <div className="w-full flex gap-2 pl-[64px]">
        <div className="h-9 px-2 active:scale-90 ease-linear duration-75 relative min-w-9 flex items-center justify-center gap-1 group cursor-pointer">
          <div className="absolute inset-0 size-full group-hover:bg-content-hover duration-75 ease-linear z-[-1] rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"></div>
          <Icon name="thread_footer_heart_white" className="dark:block hidden" size={20} />
          <Icon name="thread_footer_heart_black" className="dark:hidden" size={20} />
          <span className="leading-[18px] text-[13px] mt-1 block">999</span>
        </div>
        <div className="h-9 px-2 active:scale-90 ease-linear duration-75 relative min-w-9 flex items-center justify-center gap-1 group cursor-pointer">
          <div className="absolute inset-0 size-full group-hover:bg-content-hover duration-75 ease-linear z-[-1] rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"></div>
          <Icon name="thread_footer_comment_white" className="dark:block hidden" size={20} />
          <Icon name="thread_footer_comment_black" className="dark:hidden" size={20} />
          <span className="leading-[18px] text-[13px] mt-1 block">999</span>
        </div>
        <div className="h-9 px-2 active:scale-90 ease-linear duration-75 relative min-w-9 flex items-center justify-center gap-1 group cursor-pointer">
          <div className="absolute inset-0 size-full group-hover:bg-content-hover duration-75 ease-linear z-[-1] rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"></div>
          <Icon name="thread_footer_repost_white" className="dark:block hidden" size={20} />
          <Icon name="thread_footer_repost_black" className="dark:hidden" size={20} />
        </div>
        <div className="h-9 px-2 active:scale-90 ease-linear duration-75 relative min-w-9 flex items-center justify-center gap-1 group cursor-pointer">
          <div className="absolute inset-0 size-full group-hover:bg-content-hover duration-75 ease-linear z-[-1] rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"></div>
          <Icon name="thread_footer_share_white" className="dark:block hidden" size={20} />
          <Icon name="thread_footer_share_black" className="dark:hidden" size={20} />
        </div>
      </div>

      {withPath && <div className="absolute left-[42px] top-16 h-[calc(100%-72px)] bg-border w-0.5"></div>}
    </div>
  )
}

export default Thread
