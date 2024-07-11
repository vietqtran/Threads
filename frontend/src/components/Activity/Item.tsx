import Image from 'next/image'
import React, { memo } from 'react'
import CommonButton from '../Common/Button'
import Icon from '../Common/Icon'

type Props = {
  type?: 'like' | 'reply' | 'follow'
}

const Item = ({ type }: Props) => {
  return (
    <div className="w-full pl-4 pt-3 gap-3 flex items-start">
      <div className="flex-shrink-0 relative mt-1 size-9 border rounded-full">
        <Image
          src={'/images/user.jpg'}
          width={500}
          height={500}
          alt=""
          className="rounded-full size-full object-cover"
        />
        <div className="size-[22px] rounded-full absolute -bottom-1.5 -right-1.5">
          {type === 'like' && (
            <>
              <Icon name="activity_type_like_white" size={22} className="dark:hidden" />
              <Icon name="activity_type_like_black" size={22} className="hidden dark:block" />
            </>
          )}
          {type === 'reply' && (
            <>
              <Icon name="activity_type_reply_white" size={22} className="dark:hidden" />
              <Icon name="activity_type_reply_black" size={22} className="hidden dark:block" />
            </>
          )}
          {type === 'follow' && (
            <>
              <Icon name="activity_type_follow_white" size={22} className="dark:hidden" />
              <Icon name="activity_type_follow_black" size={22} className="hidden dark:block" />
            </>
          )}
        </div>
      </div>
      <div className="flex-1 pb-3 flex items-center pr-4 justify-between border-b">
        <div className="flex-1 h-full">
          <div className="w-full flex items-center gap-1">
            <div className="font-semibold">vietqtran</div>
            <div className="text-description">1w</div>
          </div>
          <div className="text-description">Follow suggestion</div>
          <div className="w-full">
            <p>
              Fake plants, pretty books, Swipies, and some of my current jams—things you'll find in my Lover's Magazine
              interview. Thank you Spaces team for the feature! …
            </p>
          </div>
        </div>
        <CommonButton variant="transparent" className="w-[104px] mt-1" title="Follow" />
      </div>
    </div>
  )
}

export default memo(Item)
