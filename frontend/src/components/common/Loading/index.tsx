import React from 'react'

interface Props {
  color: string
}

const Loading = ({ color }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <div
        style={{
          backgroundColor: color
        }}
        className="h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s]"
      ></div>
      <div
        style={{
          backgroundColor: color
        }}
        className="h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s]"
      ></div>
      <div
        style={{
          backgroundColor: color
        }}
        className="h-1.5 w-1.5 animate-bounce rounded-full"
      ></div>
    </div>
  )
}

export default Loading
