import React, { useEffect, useState } from 'react'
import Item from './Item'
import SimpleBar from 'simplebar-react'

type Props = {}

const ViewFollow = (props: Props) => {
  const [tab, setTab] = useState('followers')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [tab])

  return (
    <div className="size-full p-6 flex items-center justify-center">
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[522px] overflow-hidden bg-content rounded-2xl h-full max-h-[797px]"
      >
        <div className="size-full flex flex-col">
          <div className="grid grid-cols-2 w-full">
            <div
              onClick={() => setTab('followers')}
              className={`${tab === 'following' && 'text-description'} cursor-pointer col-span-1 h-15 relative flex flex-col items-center justify-center`}
            >
              <div className=" font-bold">Followers</div>
              <div className="text-xs">999</div>
              <div
                className={`${tab === 'following' ? 'bg-border' : 'bg-black dark:bg-white'} absolute h-[1px] w-full bottom-0`}
              ></div>
            </div>
            <div
              onClick={() => setTab('following')}
              className={`${tab === 'followers' && 'text-description'} cursor-pointer col-span-1 h-15 relative flex flex-col items-center justify-center`}
            >
              <div className=" font-bold">Following</div>
              <div className="text-xs">999</div>
              <div
                className={`${tab === 'followers' ? 'bg-border' : 'bg-black dark:bg-white'} absolute h-[1px] w-full bottom-0`}
              ></div>
            </div>
          </div>

          {isLoading && (
            <div className="size-full grid place-items-center">
              <div className="loader"></div>
            </div>
          )}
          {!isLoading && (
            <SimpleBar className="w-full max-h-[calc(100%-60px)]">
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
              <Item />
            </SimpleBar>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewFollow
