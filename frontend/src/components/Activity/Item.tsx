import Image from 'next/image'
import React from 'react'
import CommonButton from '../Common/Button'

type Props = {}

const Item = (props: Props) => {
  return (
    <div className="w-full pl-4 pt-3 gap-3 flex items-start">
      <div className="flex-shrink-0 mt-1 size-9 border rounded-full overflow-hidden">
        <Image src={'/images/user.jpg'} width={500} height={500} alt="" className="size-full object-cover" />
      </div>
      <div className="flex-1 pb-3 flex items-start pr-4 justify-between border-b">
        <div className="flex-1 h-full">
          <div className="font-semibold">vietqtran</div>
          <div className="text-description">Trần Quốc Việt</div>
        </div>
        <CommonButton variant="white" className="w-[104px] mt-1" title="Follow" />
      </div>
    </div>
  )
}

export default Item
