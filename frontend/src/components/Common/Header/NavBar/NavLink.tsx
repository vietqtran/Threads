import React, { memo } from 'react'

import Icon from '../../Icon'
import Link from 'next/link'

interface Props {
  icon: string
  activeIcon: string
  href: string
  isActive: boolean
  iconSize: number
  activeIconSize: number
  onClick?: () => void
}

const NavLink = ({ icon, activeIcon, href, isActive, iconSize, activeIconSize, onClick }: Props) => {
  return (
    <li
      onClick={onClick}
      className='relative grid aspect-square h-15 w-15 cursor-pointer place-items-center rounded-lg duration-100 ease-linear before:absolute before:z-0 before:size-full before:scale-75 before:rounded-lg before:bg-black/5 before:opacity-0 before:duration-100 before:ease-linear before:content-[""] hover:before:scale-100 hover:before:opacity-100 active:scale-90 before:dark:bg-white/5'
    >
      <Link href={href} className="z-10 grid aspect-square h-full w-full place-items-center">
        {isActive ? (
          <>
            <Icon className="hidden dark:block" name={`${activeIcon}_active_white`} size={activeIconSize} />
            <Icon className="block dark:hidden" name={`${activeIcon}_active_black`} size={activeIconSize} />
          </>
        ) : (
          <>
            <Icon className="hidden dark:block" name={`${icon}_white`} size={iconSize} />
            <Icon className="block dark:hidden" name={`${icon}_black`} size={iconSize} />
          </>
        )}
      </Link>
    </li>
  )
}

export default memo(NavLink)
