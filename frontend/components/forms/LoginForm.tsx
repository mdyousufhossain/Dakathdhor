'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Loader from '../cards/loader'
import { apiRequest } from '@/app/api/registration/api'
import { useRouter } from 'next/navigation'

const LoginSchema = z.object({
  username: z.string().min(4,'Username is too short'),
  password: z.string().min(6,'Password is required'),
})

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true)
    setLoginError(null)

    try {
      const response = await apiRequest('/user/login', 'POST', values)
      console.log('Login successful:', response)
      router.push('/') // Redirect to the homepage or dashboard after successful login
    } catch (error: any) {
      console.error('Login failed:', error)
      setLoginError(error?.response?.data?.message || 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h1 className='text-xl font-bold text-center mb-4'>Login</h1>
        {loginError && (
          <p className='mb-4 text-sm text-center text-red-500'>{loginError}</p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your username'
                      {...field}
                      disabled={isLoading}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your password'
                      type='password'
                      {...field}
                      disabled={isLoading}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? <Loader /> : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
