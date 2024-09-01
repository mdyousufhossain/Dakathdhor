'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/auth/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserInfo } from '@/app/api/registration/api'
import { useRouter } from 'next/navigation'
import { userData } from '@/type'

const Page = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<userData | null>(null)
  const [error, setError] = useState(null)
  const id = user?.items?.userid

  const gettingUserData = async () => {
    if (id) {
      console.log(id)
      try {
        const response = await getUserInfo(id)
        
        setUserData(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    gettingUserData()
  },[id])

  return (
    <div className='flex flex-col items-center p-8'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <div className='flex items-center'>
            <Avatar className='h-16 w-16 mr-4'>
              <AvatarImage
                src={userData?.avatar || ''}
                alt={userData?.username || 'User'}
              />
              <AvatarFallback>{userData?.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-xl font-bold'>
                {userData?.username}
              </CardTitle>
              <p className='text-sm  text-gray-700'>{userData?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <p className='font-semibold'>Username:</p>
              <p>{userData?.username}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold '>Email:</p>
              <p className='text-gray-700'>{userData?.email}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold'>Joined:</p>
              <p>
                {userData?.createdAt
                  ? new Date(userData?.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='font-semibold'>Bio:</p>
              <p>{userData?.bio || 'No bio available'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
