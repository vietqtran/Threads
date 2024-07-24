import Icon from '../../Icon'
import React from 'react'
import DefaultMenu from './DefaultMenu'
import { AnimatePresence } from 'framer-motion'

const Menu = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleClickIcon = () => setIsOpen(!isOpen)
    return (
        <li className="group relative h-8.5 w-8.5">
            <div
                onClick={handleClickIcon}
                className="aspect-square size-full cursor-pointer duration-150 ease-out active:scale-90"
            >
                <Icon
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 duration-150 ease-linear group-hover:opacity-0 dark:block"
                    size={23}
                    name="menu_desktop_white"
                />
                <Icon
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 duration-150 ease-linear group-hover:opacity-100 dark:block"
                    size={23}
                    name="menu_desktop_active_white"
                />
                <Icon
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-150 ease-linear group-hover:opacity-0 dark:hidden"
                    size={23}
                    name="menu_desktop_black"
                />
                <Icon
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-150 ease-linear group-hover:opacity-100 dark:hidden"
                    size={23}
                    name="menu_desktop_active_black"
                />
            </div>

            <AnimatePresence>{isOpen && <DefaultMenu setIsOpen={setIsOpen} />}</AnimatePresence>
        </li>
    )
}

export default Menu
