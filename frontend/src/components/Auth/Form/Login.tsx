'use client'

import AuthInput from '@/components/Common/Input/AuthInput'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { isAllNumber, isValidEmail, isValidPhone } from '@/utils/validate'
import AuthButton from '@/components/Common/Button/AuthButton'

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
    </form>
  )
}

export default Login
