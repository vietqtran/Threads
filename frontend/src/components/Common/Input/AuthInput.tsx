import React from 'react'
import { FieldError, Merge, UseFormRegister } from 'react-hook-form'

type ValidLoginFieldNames = 'email' | 'password'

type Props = {
  type: string
  placeholder: string
  name: ValidLoginFieldNames
  register: UseFormRegister<any>
  error: string | FieldError | Merge<FieldError, FieldError> | undefined
}

const AuthInput = ({ type, placeholder, name, register, error }: Props) => {
  return (
    <div className="w-full mb-2 flex flex-col">
      <input
        className="w-full placeholder:text-[#999999] text-15px focus:outline-none dark:placeholder:text-[#777777] p-4 block leading-none rounded-xl bg-content border border-transparent focus:border-border"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {/* {error && error.toString() && <span className="block w-full">{error.toString()}</span>} */}
    </div>
  )
}

export default AuthInput
