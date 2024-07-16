'use client'

import AuthInput from '@/components/Common/Input/AuthInput'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { isAllNumber, isValidEmail, isValidPhone } from '@/utils/validate'
import AuthButton from '@/components/Common/Button/AuthButton'
import { useAuth } from '@/hooks/useAuth'
import { SignUpCredential } from '@/types/auth'
import Loading from '@/components/Common/Loading'

const registerSchema = z
  .object({
    credential: z
      .string()
      .min(1, { message: 'Email or phone number is required' })
      .superRefine((credential, ctx) => {
        if (isAllNumber(credential) && !(credential && isValidPhone(credential))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number'
          })
          return
        }
        if (!isAllNumber(credential) && !(credential && isValidEmail(credential))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid email'
          })
          return
        }
      }),
    username: z
      .string()
      .min(1, { message: 'Username is required' })
      .min(6, { message: 'Username must be at least 6 characters' })
      .max(20, { message: 'Username must be at most 20 characters' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' })
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Confirm password does not match',
    path: ['confirmPassword']
  })

const Register = () => {
  const { isLoading, signup } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: any) => {
    const signUpCredentials: SignUpCredential = {
      credential: data.credential,
      password: data.password,
      username: data.username
    }
    await signup(signUpCredentials)
  }

  const handleBeforeSubmit = () => {
    if (errors) {
      console.log(errors)
      return
    }
    handleSubmit(onSubmit)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <h1 className="text-base font-bold block mb-4 text-center">Create new your Threads account</h1>
      <AuthInput
        error={errors.credential?.message}
        key={'credential'}
        register={register}
        name="credential"
        placeholder="Email or phone number"
        type="text"
      />
      <AuthInput
        error={errors.username?.message}
        key={'username'}
        register={register}
        name="username"
        placeholder="Username"
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
      <AuthInput
        error={errors.confirmPassword?.message}
        key={'confirmPassword'}
        register={register}
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
      <AuthButton onClick={handleBeforeSubmit} disabled={!isDirty || !isValid}>
        {isLoading ? <Loading size={5} /> : <span>Register</span>}
      </AuthButton>
    </form>
  )
}

export default Register
