'use client'

import React, { use, useEffect, useState } from 'react'
import { Search, Bell, User, AlertTriangle, PlusCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/auth/AuthContext'
import { userData } from '@/type'
import { getUserInfo } from '@/app/api/registration/api'
import Link from 'next/link'

const Header = () => {
  const { user } = useAuth()
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
    <section className="flex w-full p-4 justify-between bg-white ">
      {/* Left Section - Logo, Motto, and Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gray-300" /> {/* Logo Placeholder */}
          <div className='flex flex-col items-center'>
            <h1 className="font-bold text-lg capitalize">DakathDhor </h1>
            <p className="text-sm text-gray-500">emergency help</p>
          </div>
        </div>
      </div>

      {/* Middle Section - Emergency Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Local Emergency</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Global Emergency</span>
        </Button>
      </div>

      {/* Right Section - Create Post, Profile, Notifications */}
      <div className="flex items-center space-x-4">
        <Link href={'/createtask'} className="p-2">
          <PlusCircle className="w-6 h-6" />
        </Link>
        <Button variant="ghost" className="p-2">
          <Bell className="w-6 h-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
          <AvatarImage src={userData?.avatar || ''} alt={userData?.username || 'userData'} />
          <AvatarFallback>{userData?.username?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{userData?.username}</span>
        </div>
      </div>
    </section>
  )
}

export default Header
