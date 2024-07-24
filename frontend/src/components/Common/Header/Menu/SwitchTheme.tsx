import React from 'react'
import Icon from '../../Icon'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface Props {
    setTab: React.Dispatch<React.SetStateAction<string>>
}

const SwitchTheme = ({ setTab }: Props) => {
    const { theme, setTheme } = useTheme()

    const handleThemeChange = (newTheme: string) => () => setTheme(newTheme)

    return (
        <div className="w-full">
            <div className="relative h-12 w-full">
                <div
                    onClick={() => setTab('default')}
                    className="absolute left-0 top-0 grid aspect-square h-12 w-12 cursor-pointer place-items-center active:opacity-50"
                >
                    <Icon name="header_menu_appearance_narrow_left_black" className="dark:hidden" size={16} />
                    <Icon name="header_menu_appearance_narrow_left_white" className="hidden dark:block" size={16} />
                </div>
                <div className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 text-15px font-medium">
                    Appearance
                </div>
            </div>
            <div className="w-full p-4 pt-2">
                <div className="relative flex h-11 w-full rounded-xl bg-background">
                    <div
                        className={`absolute duration-200 top-0 z-0 h-full w-1/3 rounded-xl border bg-content-hover ${theme === 'light' ? 'left-0' : theme === 'dark' ? 'left-1/3' : 'left-2/3'}`}
                    ></div>
                    <button
                        onClick={handleThemeChange('light')}
                        className="relative z-10 grid h-full w-1/3 cursor-pointer place-items-center rounded-xl"
                    >
                        <Icon
                            name={
                                theme === 'light'
                                    ? 'header_menu_appearance_sun_active_black'
                                    : 'header_menu_appearance_sun_black'
                            }
                            className="dark:hidden"
                            size={18}
                        />
                        <Icon
                            name={
                                theme === 'light'
                                    ? 'header_menu_appearance_sun_active_white'
                                    : 'header_menu_appearance_sun_white'
                            }
                            className="hidden dark:block"
                            size={18}
                        />
                    </button>
                    <button
                        onClick={handleThemeChange('dark')}
                        className="relative z-10 grid h-full w-1/3 cursor-pointer place-items-center rounded-xl"
                    >
                        <Icon
                            name={
                                theme === 'dark'
                                    ? 'header_menu_appearance_moon_active_black'
                                    : 'header_menu_appearance_moon_black'
                            }
                            className="dark:hidden"
                            size={18}
                        />
                        <Icon
                            name={
                                theme === 'dark'
                                    ? 'header_menu_appearance_moon_active_white'
                                    : 'header_menu_appearance_moon_white'
                            }
                            className="hidden dark:block"
                            size={18}
                        />
                    </button>
                    <button
                        onClick={handleThemeChange('system')}
                        className="relative z-10 grid h-full w-1/3 cursor-pointer place-items-center"
                    >
                        <span
                            className={`block text-15px font-medium ${theme === 'system' ? 'text-black dark:text-[#f3f5f7]' : 'text-description'}`}
                        >
                            Auto
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SwitchTheme
