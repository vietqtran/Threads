'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoginDto, RegisterDto, useAuth } from '@/hooks'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Loading from '@/components/common/Loading'
import React from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {}

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required.' }),
    surname: z.string(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .min(1, { message: 'Email is required.' }),
    password: z
      .string()
      .min(1, { message: 'Password is required.' })
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required.' })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword']
      })
    }
  })

const RegisterForm = ({}: Props) => {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const registerDto: RegisterDto = {
      email: values.email,
      password: values.password,
      name: values.name,
      surname: values.surname
    }
    register(registerDto)
    toast.error('Event has been created')
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  return (
    <div className="grid h-full w-full place-items-center rounded-xl bg-white p-10 sm:h-fit sm:w-[476px]">
      <div className="w-full max-w-[476px]">
        <div className="mb-8">
          <Image
            src="/assets/images/logo-tagline-black.svg"
            className="h-7 w-fit"
            alt=""
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-6 text-gray-800">Create a EcomMERN account</h1>
          <span className="text-sm font-medium text-gray-600">Final step before starting</span>
        </div>

        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-gray-600">Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      className="h-9 rounded-md ring-1 ring-gray-500 duration-75 ease-linear focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-start justify-between gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-600">Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        className="h-9 rounded-md ring-1 ring-gray-500 duration-75 ease-linear focus:ring-2 focus:ring-blue-500"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-gray-600">Surname</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="surname"
                        className="h-9 rounded-md ring-1 ring-gray-500 duration-75 ease-linear focus:ring-2 focus:ring-blue-500"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-gray-600">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      className="h-9 rounded-md ring-1 ring-gray-500 duration-75 ease-linear focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-gray-600">Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      className="h-9 rounded-md ring-1 ring-gray-500 duration-75 ease-linear focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button disabled={isLoading} className="h-11 w-full rounded-md" type="submit">
                {!isLoading && <span>Continue by email</span>}
                {isLoading && <Loading color="white" />}
              </Button>
            </div>
          </form>
        </Form>

        <div className="my-5 flex items-center px-10">
          <span className="h-[1px] flex-1 bg-gray-700 opacity-25"></span>
          <span className="block px-2 opacity-50">or</span>
          <span className="h-[1px] flex-1 bg-gray-700 opacity-25"></span>
        </div>

        <div className="grid w-full grid-cols-3 gap-2">
          <div className="group grid h-12 cursor-pointer place-items-center rounded-md bg-gray-100 hover:bg-gray-200">
            <svg width="19" height="19" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.2669 0.599609C17.5182 2.30623 16.8235 3.97816 15.9072 5.16107C14.9268 6.42989 13.2369 7.41124 11.5996 7.36002C11.3007 5.72609 12.066 4.0426 12.9972 2.9109C14.0186 1.66191 15.7692 0.703692 17.2669 0.599609ZM22.1854 24.6212C23.0295 23.3276 23.3448 22.675 24 21.2146C19.2343 19.4022 18.4707 12.6269 23.1871 10.0265C21.7485 8.22242 19.727 7.17664 17.8187 7.17664C16.4437 7.17664 15.5016 7.53546 14.6452 7.86166C13.9315 8.13349 13.2772 8.38268 12.4815 8.38268C11.6216 8.38268 10.8601 8.10965 10.0628 7.82376C9.18662 7.50962 8.26716 7.17994 7.12624 7.17994C4.98479 7.17994 2.70539 8.48841 1.26024 10.7254C-0.771178 13.8759 -0.424671 19.7987 2.86961 24.8443C4.04708 26.65 5.62032 28.6788 7.67802 28.697C8.53183 28.7054 9.09999 28.4506 9.71483 28.1748C10.4186 27.8592 11.1834 27.5162 12.5078 27.5091C13.8399 27.5011 14.5927 27.8484 15.2871 28.1686C15.8862 28.4449 16.4417 28.7012 17.2883 28.692C19.3476 28.6755 21.0079 26.427 22.1854 24.6212Z"
                fill="#0B0B0A"
              />
            </svg>
          </div>
          <div className="group grid h-12 cursor-pointer place-items-center rounded-md bg-gray-100 hover:bg-gray-200">
            <svg width="19" height="19" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M48 24C48 10.7438 37.2562 0 24 0C10.7438 0 0 10.7438 0 24C0 35.9813 8.775 45.9094 20.25 47.7094V30.9375H14.1562V24H20.25V18.7125C20.25 12.6984 23.8313 9.375 29.3156 9.375C31.9406 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6594C28.6781 15.75 27.75 17.6016 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7094C39.225 45.9094 48 35.9813 48 24Z"
                fill="#1877F2"
              />
              <path
                d="M33.3423 30.9375L34.4062 24H27.75V19.5C27.75 17.6016 28.6782 15.75 31.6595 15.75H34.6875V9.84375C34.6875 9.84375 31.9406 9.375 29.3156 9.375C23.8313 9.375 20.2501 12.6984 20.2501 18.7125V24H14.1562V30.9375H20.2501V47.7094C21.4735 47.9016 22.725 48 24 48C25.275 48 26.5266 47.9016 27.75 47.7094V30.9375H33.3423Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="group grid h-12 cursor-pointer place-items-center rounded-md bg-gray-100 hover:bg-gray-200">
            <svg width="19" height="19" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.0001 4.62094C12.953 4.62094 14.2704 5.4645 15.0215 6.16939L17.9566 3.30361C16.1539 1.62805 13.8081 0.599609 11.0001 0.599609C6.93258 0.599609 3.41969 2.93383 1.70947 6.33116L5.07214 8.94272C5.91569 6.43516 8.24992 4.62094 11.0001 4.62094V4.62094Z"
                fill="#EA4335"
              />
              <path
                d="M20.984 11.2307C20.984 10.3756 20.9147 9.7516 20.7644 9.10449H11V12.964H16.7316C16.616 13.9232 15.992 15.3676 14.6053 16.3383L17.8871 18.8805C19.8516 17.0663 20.984 14.3969 20.984 11.2307V11.2307Z"
                fill="#4285F4"
              />
              <path
                d="M5.08365 13.0564C4.8641 12.4093 4.73699 11.7159 4.73699 10.9995C4.73699 10.2831 4.8641 9.58972 5.0721 8.94261L1.70943 6.33105C1.00454 7.74083 0.600098 9.32394 0.600098 10.9995C0.600098 12.6751 1.00454 14.2582 1.70943 15.6679L5.08365 13.0564V13.0564Z"
                fill="#FBBC05"
              />
              <path
                d="M11.0001 21.3998C13.8081 21.3998 16.1654 20.4753 17.8872 18.8806L14.6054 16.3384C13.7272 16.9509 12.5485 17.3784 11.0001 17.3784C8.24984 17.3784 5.91561 15.5642 5.08361 13.0566L1.72095 15.6682C3.43117 19.0655 6.9325 21.3998 11.0001 21.3998V21.3998Z"
                fill="#34A853"
              />
            </svg>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1 text-xs">
          <span>Already have a EcomMERN account? </span>
          <Link href={'/login'} className="flex items-center gap-1 text-blue-500">
            <span className="font-medium">Log in</span>
            <svg width="12" height="10" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-blue-500"
                d="M0.777344 6.00005C0.777344 5.53982 1.15044 5.16672 1.61068 5.16672L12.3769 5.16672L9.35478 2.1449C9.02933 1.81948 9.02931 1.29184 9.35473 0.966385C9.68015 0.640931 10.2078 0.640904 10.5332 0.966326L14.9781 5.41077C15.1344 5.56705 15.2222 5.77903 15.2222 6.00005C15.2222 6.22108 15.1344 6.43306 14.9781 6.58934L10.5332 11.0338C10.2078 11.3592 9.68015 11.3592 9.35473 11.0337C9.02931 10.7083 9.02933 10.1806 9.35478 9.85521L12.3769 6.83339L1.61068 6.83339C1.15044 6.83339 0.777344 6.46029 0.777344 6.00005Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
