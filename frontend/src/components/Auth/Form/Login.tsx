'use client'

import AuthInput from '@/components/Common/Input/AuthInput'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { isAllNumber, isValidEmail, isValidPhone } from '@/utils/validate'
import AuthButton from '@/components/Common/Button/AuthButton'
import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/Common/Icon'

const loginSchema = z.object({
  loginCredential: z
    .string()
    .min(1, { message: 'Username, email or phone number is required' })
    .superRefine((loginCredential, ctx) => {
      if (isAllNumber(loginCredential) && !(loginCredential && isValidPhone(loginCredential))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid phone number'
        })
        return
      }
      if (loginCredential.includes('@') && !(loginCredential && isValidEmail(loginCredential))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid email'
        })
        return
      }
      if (!(loginCredential && loginCredential.length >= 6 && loginCredential.length <= 20)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid username'
        })
        return
      }
    }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
})

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleBeforeSubmit = () => {
    if(errors) {
      console.log(errors)
      return
    }
    handleSubmit(onSubmit)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <h1 className="text-base font-bold block mb-4 text-center">Log in with your Threads account</h1>
      <AuthInput
        error={errors.loginCredential?.message}
        key={'loginCredential'}
        register={register}
        name="loginCredential"
        placeholder="Username, phone or email"
        type="text"
      />
      <AuthInput
        error={errors.password?.message}
        key={'password'}
        register={register}
        name="password"
        placeholder="Password"
        type="password"
      />
      <AuthButton onClick={handleBeforeSubmit} disabled={!isDirty || !isValid}>Log in</AuthButton>

      <Link href='/' className='mt-4 block text-center text-secondary' >Forgot password?</Link>

      <div className="w-full flex items-center justify-center my-6">
        <hr className="flex-1 h-[1px] bg-secondary" />
        <div className="px-3 text-center text-15px font-medium text-secondary">or</div>
        <hr className="flex-1 h-[1px] bg-secondary" />
      </div>

      <div className='p-5 pr-3 border rounded-2xl'>
        <div className='size-full h-[45px] flex items-center'>
          <div className='flex-shrink-0'>
            <Image src='/images/ig-logo.png' className='h-[45px] w-[45px] aspect-square' alt='' priority width={500} height={500} />
          </div>
          <div className='flex-1'>
            <span className='pl-2 break-before-auto leading-[21px] block font-bold text-base'>Continue with Instagram</span>
          </div>
          <div className='flex-shrink-0 h-full flex items-center w-6'>
            <div className='w-6 h-6 grid place-items-center cursor-pointer'> 
              <Icon name='arrow_auth_with_ig_white' size={16} className='dark:hidden' />
              <Icon name='arrow_auth_with_ig_black' size={16} className='hidden dark:block' />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
