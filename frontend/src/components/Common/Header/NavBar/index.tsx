import { usePathname, useRouter } from 'next/navigation'
import NavLink from './NavLink'
import React from 'react'
import { useUserStore } from '@/providers/StoresProvider'

const NavBar = () => {
    const pathName = usePathname()
    const { user } = useUserStore(state => state)
    const { push } = useRouter()

    return (
        <ul className="flex flex-1 flex-col items-center justify-center gap-1">
            <NavLink
                isActive={pathName === '/'}
                key={'home-nav-link'}
                icon="home"
                activeIcon="home"
                activeIconSize={24}
                iconSize={24}
                href="/"
            />
            <NavLink
                isActive={pathName === '/search'}
                key={'search-nav-link'}
                icon="search"
                activeIcon="search"
                iconSize={24}
                activeIconSize={24}
                href="/search"
            />
            <NavLink
                isActive={pathName === '/activity'}
                key={'heart-nav-link'}
                icon="heart"
                activeIcon="heart"
                iconSize={31}
                activeIconSize={29}
                href="/activity"
                onClick={() => {
                    if (!user) {
                        push('/login')
                    }
                }}
            />
            <NavLink
                isActive={pathName === `/@${user?.username}`}
                key={'user-nav-link'}
                icon="user"
                activeIcon="user"
                iconSize={25}
                activeIconSize={24}
                href={`/@${user?.username}`}
                onClick={() => {
                    if (!user) {
                        push('/login')
                    }
                }}
            />
        </ul>
    )
}

export default NavBar
