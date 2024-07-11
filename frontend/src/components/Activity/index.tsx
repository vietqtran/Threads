'use client'

import React from 'react'
import PageSectionWrapper from '../Common/Wrapper/PageSectionWrapper'
import SimpleBar from 'simplebar-react'
import Item from './Item'

type Props = {}

const Activity = (props: Props) => {
  return (
    <PageSectionWrapper title="Activity">
      <SimpleBar className="size-full">
        <Item />
        <Item type="follow" />
        <Item />
        <Item />
        <Item type="like" />
        <Item />
        <Item />
        <Item type="reply" />
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
    </PageSectionWrapper>
  )
}

export default Activity
