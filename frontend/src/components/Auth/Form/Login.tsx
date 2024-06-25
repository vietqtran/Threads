'use client'

import AuthInput from '@/components/Common/Input/AuthInput'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

  const loginSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' }),
  });

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(loginSchema),
      });

      const onSubmit = (data: any) =>{
        console.log(data)
      }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
        <h1 className='text-base font-bold block mb-4 text-center'>Log in with your Threads account</h1>
        <AuthInput error={errors.email?.message} key={'email'} register={register} name='email' placeholder='Username, phone or email' type='text'   />
        <AuthInput error={errors.password?.message} key={'password'} register={register} name='password' placeholder='Password' type='password'   />
    </form>
  )
}

export default Login