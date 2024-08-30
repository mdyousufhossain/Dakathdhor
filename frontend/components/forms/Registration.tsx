'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RegisterSchema } from '@/lib/validation'
import { Checkbox } from '../ui/checkbox'
import { apiRequest } from '@/app/api/registration/api'
import Loader from '../cards/loader'
import { useRouter } from 'next/navigation'
import { checkAvailability } from '@/app/api/registration/api'
import { debounce } from '@/lib/utils'

function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      batman: false,
      mobile: '',
      location: '',
      bio: '',
    },
  })

  const handleUsernameChange = async (value: string) => {
    if (value.trim() !== '') {
      const available = await checkAvailability('username', value)
      setUsernameAvailable(available)
    } else {
      setUsernameAvailable(null)
    }
  }

  const handleEmailChange = async (value: string) => {
    if (value.trim() !== '') {
      const available = await checkAvailability('email', value)
      setEmailAvailable(available)
    } else {
      setEmailAvailable(null)
    }
  }

  const debouncedHandleUsernameChange = debounce(handleUsernameChange, 500)
  const debouncedHandleEmailChange = debounce(handleEmailChange, 500)

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true)
    try {
      const response = await apiRequest('/user/register', 'POST', values)
      console.log('Registration successful:', response)
      localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
      router.push('/')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h1 className='text-xl font-bold text-center mb-4'>Create Account</h1>
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
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedHandleUsernameChange(e.target.value)
                      }}
                      className="text-sm"
                    />
                  </FormControl>
                  {usernameAvailable !== null && (
                    <p
                      className={`text-xs mt-1 ${
                        usernameAvailable ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {usernameAvailable
                        ? 'Username is available'
                        : 'Username is already in use'}
                    </p>
                  )}
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
                      placeholder='Make it strong'
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
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your email address'
                      type='email'
                      {...field}
                      disabled={isLoading}
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedHandleEmailChange(e.target.value)
                      }}
                      className="text-sm"
                    />
                  </FormControl>
                  {emailAvailable !== null && (
                    <p
                      className={`text-xs mt-1 ${
                        emailAvailable ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {emailAvailable
                        ? 'Email is available'
                        : 'Email is already in use'}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='batman'
              render={({ field }) => (
                <FormItem className='flex items-start space-x-3 p-4 border rounded-md'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className='leading-tight'>
                    <FormLabel className='text-sm text-gray-700'>
                      Become Batman
                    </FormLabel>
                    <FormDescription className='text-xs text-gray-500'>
                      Youll receive notifications from those in need. Be ready.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mobile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your mobile number'
                      type='text'
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
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your location'
                      {...field}
                      disabled={isLoading}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormDescription className='text-xs'>
                    Location will be used for emergency services.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Bio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='A bit about yourself...'
                      {...field}
                      disabled={isLoading}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormDescription className='text-xs'>
                    E.g., A fan of Jalal Uddin Rumi
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? <Loader /> : 'Create Account'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegistrationForm
