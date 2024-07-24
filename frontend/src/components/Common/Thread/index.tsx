'use client'

import React, { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import CommonUsername from '@/components/Common/Username'
import { FreeMode } from 'swiper/modules'
import Icon from '@/components/Common/Icon'
import Image from 'next/image'
import { useModalStore } from '@/providers/StoresProvider'
import Actions from './Actions'
import Options from './Options'

type Props = {
    withPath?: boolean
    isFeed?: boolean
    isFirst?: boolean
    isReply?: boolean
}

const Thread = ({ withPath, isFeed, isFirst, isReply }: Props) => {
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
        <div className={`w-full relative pb-2 ${!isReply ? 'pt-3' : 'border-b'} ${isFeed ? 'border-b pt-3' : ''}`}>
            {isFeed && isFirst && (
                <div className="mb-2 flex gap-2 px-12">
                    <Icon name="thread_star_white" size={16} className="hidden dark:block" />
                    <Icon name="thread_star_black" size={16} className="dark:hidden" />
                    <span className="text-description text-sm">First thread</span>
                </div>
            )}
            <div className="mb-2 flex size-full items-start gap-3 px-6">
                <div className="relative mt-1 h-[38px] w-[38px] flex-shrink-0 rounded-full border">
                    <Image
                        src={'/images/user.jpg'}
                        width={500}
                        height={500}
                        className="size-full cursor-pointer rounded-full object-cover"
                        priority
                        alt=""
                    />
                    <div className="absolute -bottom-1 -right-1 grid h-5 w-5 cursor-pointer place-items-center rounded-full border-2 border-same-bg-content bg-black duration-75 ease-linear hover:scale-105 active:scale-90 dark:bg-white">
                        <Icon name="home_thread_plus_white" size={10} className="dark:hidden" />
                        <Icon name="home_thread_plus_black" size={10} className="hidden dark:block" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="mb-1 flex w-full items-center justify-between">
                        <div className="flex flex-1 items-center gap-1.5">
                            <CommonUsername />
                            <div>
                                <span className="text-sm text-secondary">23h</span>
                            </div>
                        </div>
                        <Options threadId="1" />
                    </div>
                    <div className="w-full">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                            PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mb-1.5 w-full">
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
            <SwiperSlide className='mr-1.5 h-full max-w-[245px]'>
                <div className='h-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_landscape.png'} className='h-full w-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 h-full max-w-[245px]'>
                <div className='h-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_landscape.png'} className='h-full w-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 h-full max-w-[245px]'>
                <div className='h-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_landscape.png'} className='h-full w-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 h-full max-w-[245px]'>
                <div className='h-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_landscape.png'} className='h-full w-full object-cover' width={2000} height={2000} alt='' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='mr-1.5 h-full max-w-[245px]'>
                <div className='h-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_landscape.png'} className='h-full w-full object-cover' width={2000} height={2000} alt='' />
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
                        <SwiperSlide key={`thread-medias-${swiperId}-${index}`} className="mr-1.5 h-full max-w-[210px]">
                            <div
                                onClick={() => handleViewMedia(index)}
                                className="h-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95"
                            >
                                <Image
                                    src={image}
                                    className="h-full w-full object-cover"
                                    width={2000}
                                    height={2000}
                                    alt=""
                                />
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

                <div className="flex w-full">
                    {/* <div className='w-[72px]'></div> */}
                    <div className="flex-1">
                        {/* With 1 Image */}
                        {/* Portrait */}
                        {/* <div className='max-h-[430px] max-w-64 cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_portrait.jpg'} className='max-h-[430px] max-w-64 object-cover' width={2000} height={2000} alt='' />
                </div> */}
                        {/* Landscape */}
                        {/* <div className='max-h-[380px] max-w-full cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                    <Image src={'/images/post_landscape.png'} className='max-h-[380px] max-w-full object-cover' width={2000} height={2000} alt='' />
                </div> */}

                        {/* With 2 images */}
                        <div className="flex w-full gap-1.5">
                            {/* 2 Portrait */}
                            {/* <div className='w-1/2'>
                        <div className='cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                            <Image src={'/images/post_portrait.jpg'} className='size-full object-cover' width={2000} height={2000} alt='' />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='cursor-pointer overflow-hidden rounded-lg border duration-75 ease-linear active:scale-95'>
                            <Image src={'/images/post_portrait.jpg'} className='size-full object-cover' width={2000} height={2000} alt='' />
                        </div>
                    </div> */}
                        </div>
                    </div>
                    {/* <div className='w-6'></div> */}
                </div>
            </div>

            <Actions threadId="" />

            {withPath && <div className="absolute left-[42px] top-16 h-[calc(100%-72px)] w-0.5 bg-border"></div>}
        </div>
    )
}

export default Thread
