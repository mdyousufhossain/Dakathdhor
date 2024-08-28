'use client'

import React, { use } from 'react'
import { Search, Bell, User, AlertTriangle, PlusCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/auth/AuthContext'

const Header = () => {
    const { user } = useAuth()
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md z-50">
      {/* Left Section - Logo, Motto, and Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gray-300" /> {/* Logo Placeholder */}
          <div>
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
        <Button variant="ghost" className="p-2">
          <PlusCircle className="w-6 h-6" />
        </Button>
        <Button variant="ghost" className="p-2">
          <Bell className="w-6 h-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar || ''} alt={user?.username || 'User'} />
          <AvatarFallback>{user?.username?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{user?.username}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
