import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  title: string
  variant: 'white' | 'black' | 'white-disable'
  className?: string
}

const CommonButton = ({ title, variant, className }: Props) => {
  const style = () => {
    switch (variant) {
      case 'white':
        return 'bg-content'
      case 'black':
        return 'bg-black dark:bg-content border dark:text-white'
      case 'white-disable':
        return 'bg-inherit'
    }
  }
  return (
    <button
      className={`${cn(`${variant} max-w-full font-medium text-sm active:scale-95 ease-linear duration-75 grid place-items-center border h-[34px] rounded-[10px]`, className)}`}
    >
      {title}
    </button>
  )
}

export default CommonButton
