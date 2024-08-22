// lib/api.ts
import { User } from "@/type"
const URL = process.env.LOCALURL || 'http://localhost:9000/api/v1'

export async function apiRequest(endpoint: string, method: string, data?: any) {
  const url = `${URL}${endpoint}`

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include', // include cookies
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Something went wrong')
  }
   
  return response.json()
}

export const checkAvailability = async (
  type: 'username' | 'email',
  value: string
) => {
  const response = await fetch(`${URL}/user/${type}?${type}=${value}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status === 401) {
    console.error(response)
    return false
  }

  const data = await response.json()
  // console.log(data)
  return data.available
}

export const getUserInfo = async (id: 'username' | 'email', value: string) => {
  const response = await fetch(`${URL}/user/getuser/${id}?${id}=${value}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status === 401) {
    console.error(response)
    return false
  }

  const data = await response.json()
  console.log(data)
  return data 
}
