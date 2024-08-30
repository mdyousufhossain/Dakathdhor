'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/AuthContext'
import Link from 'next/link'

interface SidebarProps {
  items: { label: string; icon: React.ReactNode }[]
}

const RightSidebar: React.FC<SidebarProps> = ({ items }) => {
  const { user } = useAuth()

  return (
    <aside
      className={cn(
        'w-64 bg-white fixed left-0 top-32 h-screen shadow-lg flex flex-col justify-between',
        'border-l border-gray-200 p-4'
      )}
    >
      <div className='space-y-6'>
        {/* User Info */}
        <Link href={'/profile'}>
          <div className='flex items-center space-x-4 p-2'>
            <Avatar className='w-12 h-12'>
              <AvatarImage
                src={user?.avatar || ''}
                alt={user?.username || 'User'}
              />
              <AvatarFallback>{user?.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-900'>
                {user?.username || 'Username'}
              </span>
              <span className='text-xs text-gray-500'>Dashboard</span>
            </div>
          </div>
        </Link>
        {/* Menu Items */}
        <nav className='space-y-4'>
          {items.map((item, index) => (
            <button
              key={index}
              className={cn(
                'flex items-center space-x-3 p-2 rounded-lg transition-colors',
                'hover:bg-gray-100 text-sm text-gray-800'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer (optional) */}
      <div className='text-center text-xs text-gray-400'>
        © 2024 Dakath Dhor App
      </div>
    </aside>
  )
}

export default RightSidebar
