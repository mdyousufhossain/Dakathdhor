'use client'

import { useAuth } from "@/auth/AuthContext"



const Page = () => {
    const { user } =  useAuth()
    console.log(user)
  return (
    <div> {user?.username} : this is goru </div>
  )
}
export default Page