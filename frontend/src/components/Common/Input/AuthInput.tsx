import React from 'react'
import { FieldError, Merge, UseFormRegister } from 'react-hook-form'

type ValidLoginFieldNames =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'username'
  | 'name'
  | 'registerCredential'
  | 'loginCredential'

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
        autoComplete="off"
        className="w-full leading-[21px] placeholder:text-description text-15px focus:outline-none  p-4 block rounded-xl bg-[#f5f5f5] dark:bg-content border border-transparent focus:border-border"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {/* {error && error.toString() && <span className="block w-full text-red-400">{error.toString()}</span>} */}
    </div>
  )
}

export default AuthInput
