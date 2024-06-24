import Image from 'next/image'
import React, { memo } from 'react'

interface Props {
  name: string
  size: number
  className?: string
}

const Icon = ({ name, size, className }: Props) => {
  return <Image className={className || ''} src={`/icons/${name}.svg`} width={size} height={size} alt="" priority />
}

export default memo(Icon)
