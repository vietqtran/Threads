import React from 'react'

const Address = () => {
  return <div className='flex cursor-pointer items-end gap-1'>
    <div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.25 16H11.1734L11.2424 15.9387C11.707 15.5229 12.3273 14.9219 12.9495 14.1805C14.1737 12.7217 15.5 10.6071 15.5 8.2267C15.5 5.06038 13.1721 2.75 10 2.75C6.82792 2.75 4.5 5.06038 4.5 8.2267C4.5 10.6071 5.82627 12.7217 7.0505 14.1805C7.6727 14.9219 8.29304 15.5229 8.75765 15.9387L8.82655 16H5.75C5.33579 16 5 16.3358 5 16.75C5 17.1642 5.33579 17.5 5.75 17.5H14.25C14.6642 17.5 15 17.1642 15 16.75C15 16.3358 14.6642 16 14.25 16ZM10 10.5C11.1046 10.5 12 9.60457 12 8.5C12 7.39543 11.1046 6.5 10 6.5C8.89543 6.5 8 7.39543 8 8.5C8 9.60457 8.89543 10.5 10 10.5Z" fill="#4A4A4A"/>
      </svg>
    </div>
    <div className='flex flex-col items-start justify-center'>
      <span className='block text-xs font-medium leading-4'>Delivering to Hanoi</span>
      <span className='block text-sm font-semibold leading-4'>Update Location</span>
    </div>
  </div>
}

export default Address
