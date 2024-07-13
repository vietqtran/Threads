'use client'

import React from 'react'
import PageSectionWrapper from '../Common/Wrapper/PageSectionWrapper'
import Icon from '../Common/Icon'
import SimpleBar from 'simplebar-react'
import Item from './Item'

const Search = () => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  return (
    <PageSectionWrapper title="Search">
      <div className="relative flex size-full flex-col">
        <div className="sticky top-0 z-10 w-full bg-content p-6 pb-1">
          <div className="flex h-11 w-full items-center rounded-2xl border bg-[#fafafa] dark:bg-background">
            <div className="flex w-12 flex-shrink-0 items-center justify-start pl-6">
              <Icon name="search_input_icon_black" size={16} className="dark:hidden" />
              <Icon name="search_input_icon_white" size={16} className="hidden dark:block" />
            </div>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              type="text"
              className="size-full h-full flex-1 bg-transparent"
              placeholder="Search"
            />
            {searchValue && (
              <div
                onClick={() => setSearchValue('')}
                className="mr-4 grid aspect-square h-8 flex-shrink-0 place-items-center"
              >
                <div className="cursor-pointer p-1">
                  <Icon className="hidden dark:block" name="clear_input_white" size={16} />
                  <Icon className="dark:hidden" name="clear_input_black" size={16} />
                </div>
              </div>
            )}
          </div>
        </div>
        <SimpleBar className="z-0 w-full flex-1">
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
