import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  title: string
  variant: 'white' | 'black' | 'white-disable' | 'reverse'
  className?: string
}

const CommonButton = ({ title, variant, className }: Props) => {
  const style = (v: string) => {
    switch (v) {
      case 'white':
        return 'bg-content'
      case 'black':
        return 'bg-black dark:bg-content border dark:text-white'
      case 'white-disable':
        return 'bg-inherit'
      case 'reverse':
        return 'bg-black dark:bg-[#f3f5f7] text-[#f3f5f7] dark:text-black'
      default:
        return ''
    }
  }
  return (
    <button
      className={`${cn(`${style(variant)} max-w-full font-semibold text-sm active:scale-95 ease-linear duration-75 grid place-items-center border h-[32px] rounded-[10px]`, className)}`}
    >
      {title}
    </button>
  )
}

export default CommonButton
