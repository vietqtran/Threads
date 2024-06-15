import NavLink from './NavLink'
import React from 'react'

const NavBar = () => {
  const [tab, setTab] = React.useState('home')

  return (
    <ul className="flex flex-1 flex-col items-center justify-center gap-1">
      <NavLink
        isActive={tab === 'home'}
        key={'home-nav-link'}
        icon="home"
        activeIcon="home"
        activeIconSize={24}
        iconSize={24}
        href="/"
        handleClick={() => setTab('home')}
      />
      <NavLink
        isActive={tab === 'search'}
        key={'search-nav-link'}
        icon="search"
        activeIcon="search"
        iconSize={24}
        activeIconSize={24}
        href="/"
        handleClick={() => setTab('search')}
      />
      <NavLink
        isActive={tab === 'heart'}
        key={'heart-nav-link'}
        icon="heart"
        activeIcon="heart"
        iconSize={31}
        activeIconSize={29}
        href="/"
        handleClick={() => setTab('heart')}
      />
      <NavLink
        isActive={tab === 'user'}
        key={'user-nav-link'}
        icon="user"
        activeIcon="user"
        iconSize={25}
        activeIconSize={24}
        href="/"
        handleClick={() => setTab('user')}
      />
    </ul>
  )
}

export default NavBar
