'use client'

import React from 'react'
import PageSectionWrapper from '../Common/Wrapper/PageSectionWrapper'
import Icon from '../Common/Icon'
import SimpleBar from 'simplebar-react'
import Item from './Item'

const Search = () => {
  return (
    <PageSectionWrapper title="Search">
      <div className="size-full flex flex-col relative">
        <div className="w-full sticky bg-content z-10 top-0 p-6 pb-1">
          <div className="w-full h-11 rounded-2xl bg-[#fafafa] dark:bg-background border flex items-center">
            <div className="w-12 flex-shrink-0 flex items-center justify-start pl-6">
              <Icon name="search_input_icon_black" size={16} className="dark:hidden" />
              <Icon name="search_input_icon_white" size={16} className="hidden dark:block" />
            </div>
            <input type="text" className="size-full bg-transparent flex-1 h-full" placeholder="Search" />
          </div>
        </div>
        <SimpleBar className="w-full flex-1 z-0">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </SimpleBar>
      </div>
    </PageSectionWrapper>
  )
}

export default Search
