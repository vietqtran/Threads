import React from 'react'

type Props = {
  disabled: boolean
  children: React.ReactNode
  onClick: () => void
}

const AuthButton = ({ disabled, children, onClick }: Props) => {
  return (
    <div className="flex items-center justify-center w-full rounded-xl dark:bg-white bg-black">
      <button onClick={onClick} disabled={disabled} className="disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl p-4">
        <span className='block h-6 leading-6 mt-0.5 text-15px font-semibold dark:text-[#101010] text-white'>
          {children}
        </span>
      </button>
    </div>
  )
}

export default AuthButton
