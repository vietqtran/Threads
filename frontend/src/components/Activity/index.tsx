'use client'

import React, { useCallback, useMemo } from 'react'

import ActivityContent from './ActivityContent'
import PageSectionWrapper from '../Common/Wrapper/PageSectionWrapper'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

const Activity = (props: Props) => {
  const [currentTab, setCurrentTab] = React.useState('All')
  const handelChangeTab = useCallback((tab: string) => {
    setCurrentTab(tab)
  }, [])
  const items = useMemo(() => {
    return [
      {
        id: uuidv4(),
        title: 'All',
        isActive: currentTab === 'All',
        onClick: () => handelChangeTab('All')
      },
      {
        id: uuidv4(),
        title: 'Follows',
        isActive: currentTab === 'Follows',
        onClick: () => handelChangeTab('Follows')
      },
      {
        id: uuidv4(),
        title: 'Replies',
        isActive: currentTab === 'Replies',
        onClick: () => handelChangeTab('Replies')
      },
      {
        id: uuidv4(),
        title: 'Mentions',
        isActive: currentTab === 'Mentions',
        onClick: () => handelChangeTab('Mentions')
      },
      {
        id: uuidv4(),
        title: 'Quotes',
        isActive: currentTab === 'Quotes',
        onClick: () => handelChangeTab('Quotes')
      },
      {
        id: uuidv4(),
        title: 'Reposts',
        isActive: currentTab === 'Reposts',
        onClick: () => handelChangeTab('Reposts')
      },
      {
        id: uuidv4(),
        title: 'Verified',
        isActive: currentTab === 'Verified',
        onClick: () => handelChangeTab('Verified')
      }
    ]
  }, [handelChangeTab, currentTab])

  return (
    <PageSectionWrapper items={items} title="Activity">
      <ActivityContent />
    </PageSectionWrapper>
  )
}

export default Activity
