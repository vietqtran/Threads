import Loading from '@/components/Common/Loading'
import PageSectionWrapper from '@/components/Common/Wrapper/PageSectionWrapper'
import React, { Suspense } from 'react'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageSectionWrapper title="Profile">
      <Suspense fallback={
        <div className='size-full mt-10 grid place-items-center'>
          <Loading />
        </div>
      }>
        {children}
      </Suspense>
    </PageSectionWrapper>
  )
}