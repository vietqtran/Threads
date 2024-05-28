import Image from 'next/image'
import React from 'react'

interface Props {
  url: string,
  size: number
}

const Avatar = ({url, size}: Props) => {

  return (
    <div style={{width: size+'px', height: size+'px'}} className='cursor-pointer overflow-hidden rounded-full ring-1 ring-border'>
      <Image src={url} className='h-full w-full object-cover' alt='' width={500} height={500} />
    </div>
  )
}

export default Avatar