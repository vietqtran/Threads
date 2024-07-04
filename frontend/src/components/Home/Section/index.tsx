'use client'

import Image from 'next/image'
import { MODAL } from '@/enums/modal'
import React, { useMemo } from 'react'
import SimpleBar from 'simplebar-react'
import { useHomeStore, useModalStore } from '@/providers/StoresProvider'
import { HOME_MAIN_SECTION } from '@/enums/home'
import SectionHeader from './Header'
import MainContent from './Content/MainContent'

interface Props {
  isMainSection?: boolean
  title?: string
}

const Section = ({ isMainSection = false, title }: Props) => {
  const { setMainSection, mainSection } = useHomeStore(state => state)

  const headerDropdownItems = useMemo(() => {
    return [
      {
        title: 'For you',
        isActive: mainSection === HOME_MAIN_SECTION.FOR_YOU,
        onClick: () => setMainSection(HOME_MAIN_SECTION.FOR_YOU)
      },
      {
        title: 'Following',
        isActive: mainSection === HOME_MAIN_SECTION.FOLLOWING,
        onClick: () => setMainSection(HOME_MAIN_SECTION.FOLLOWING)
      },
      {
        title: 'Liked',
        isActive: mainSection === HOME_MAIN_SECTION.LIKED,
        onClick: () => setMainSection(HOME_MAIN_SECTION.LIKED)
      },
      {
        title: 'Saved',
        isActive: mainSection === HOME_MAIN_SECTION.SAVED,
        onClick: () => setMainSection(HOME_MAIN_SECTION.SAVED)
      }
    ]
  }, [mainSection])

  const activeTitle = useMemo(() => {
    switch (mainSection) {
      case HOME_MAIN_SECTION.FOR_YOU:
        return 'For you'
      case HOME_MAIN_SECTION.FOLLOWING:
        return 'Following'
      case HOME_MAIN_SECTION.LIKED:
        return 'Liked'
      case HOME_MAIN_SECTION.SAVED:
        return 'Saved'
    }
  }, [mainSection])

  return (
    <div className="flex h-full w-full min-w-[418px] max-w-[640px] justify-center">
      <div className="h-full w-full">
        <SectionHeader
          title={isMainSection ? activeTitle : title || ''}
          isMain={isMainSection}
          items={isMainSection ? headerDropdownItems : []}
        />

        <SimpleBar className="!z-0 h-full max-h-[calc(100%-60px)] w-full overflow-auto rounded-t-3xl border border-b-0 bg-content shadow">
          {isMainSection && <MainContent />}
        </SimpleBar>
      </div>
    </div>
  )
}

export default Section