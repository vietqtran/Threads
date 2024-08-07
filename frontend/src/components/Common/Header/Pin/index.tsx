import { AnimatePresence } from 'framer-motion'
import Icon from '../../Icon'
import PinMenu from './PinMenu'
import React from 'react'

const Pin = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <li className="group relative h-8.5 w-8.5">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="aspect-square cursor-pointer duration-150 ease-out active:scale-90"
            >
                <Icon
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 duration-150 ease-linear group-hover:opacity-0 dark:block"
                    size={27}
                    name="pin_white"
                />
                <Icon
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 duration-150 ease-linear group-hover:opacity-100 dark:block"
                    size={27}
                    name="pin_active_white"
                />
                <Icon
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-150 ease-linear group-hover:opacity-0 dark:hidden"
                    size={27}
                    name="pin_black"
                />
                <Icon
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-150 ease-linear group-hover:opacity-100 dark:hidden"
                    size={27}
                    name="pin_active_black"
                />
            </div>

            <AnimatePresence>{isOpen && <PinMenu setIsOpen={setIsOpen} />}</AnimatePresence>
        </li>
    )
}

export default Pin
