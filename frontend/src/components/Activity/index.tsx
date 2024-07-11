'use client'

import React from 'react'
import PageSectionWrapper from '../Common/Wrapper/PageSectionWrapper'
import SimpleBar from 'simplebar-react'
import ActivityContent from './ActivityContent'

type Props = {}

const Activity = (props: Props) => {
  return (
    <PageSectionWrapper title="Activity">
      <ActivityContent />
    </PageSectionWrapper>
  )
}

export default Activity
