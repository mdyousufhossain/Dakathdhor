'use client'

import { useAuth } from "@/auth/AuthContext"
import RightSidebar from "@/components/shared/RightSideBar"
import { Home, Settings, LogOut } from 'lucide-react';

const items = [
  { label: 'Home', icon: <Home className='h-5 w-5' />, onClick: () => console.log('Home') },
  { label: 'Settings', icon: <Settings className='h-5 w-5' />, onClick: () => console.log('Settings') },
  { label: 'Logout', icon: <LogOut className='h-5 w-5' />, onClick: () => console.log('Logout') },
];
const Page = () => {

  const { user } = useAuth()

  return (
    <div>
      <RightSidebar items={items} />
    </div>
  )
}
export default Page