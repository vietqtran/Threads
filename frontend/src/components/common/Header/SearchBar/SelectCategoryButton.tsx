'use client'

import React from 'react'

import { HEADER_FLYOUT } from '@/constants/header'
import { setFlyout } from '@/store/header'
import { useDispatch } from 'react-redux'

const SelectCategoryButton = () => {
  const dispatch = useDispatch()

  const handleSelectCategory = () => {
    dispatch(setFlyout(HEADER_FLYOUT.SELECT_CATEGORY))
  }

  return (
    <div
      onClick={handleSelectCategory}
      className="flex flex-shrink-0 cursor-pointer items-center rounded-l-lg bg-gray-100 pl-3 pr-2 ring-1 ring-border"
    >
      <span className="block text-xs">All</span>
      <span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.71967 8.46967C6.01256 8.17678 6.48744 8.17678 6.78033 8.46967L10.25 11.9393L13.7197 8.46967C14.0126 8.17678 14.4874 8.17678 14.7803 8.46967C15.0732 8.76256 15.0732 9.23744 14.7803 9.53033L10.7803 13.5303C10.4874 13.8232 10.0126 13.8232 9.71967 13.5303L5.71967 9.53033C5.42678 9.23744 5.42678 8.76256 5.71967 8.46967Z"
            fill="#4A4A4A"
          />
        </svg>
      </span>
    </div>
  )
}

export default SelectCategoryButton
