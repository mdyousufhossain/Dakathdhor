const URL = process.env.LOCALURL || 'http://localhost:9000/api/v1'
import { createTask as CreateTaskType } from "@/type"

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


export const createTask = async (value: CreateTaskType) => {
  try {
    const response = await fetch(`${URL}/user/createtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Ensure this token is valid and present
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create task');
    }

    const data = await response.json();
    return data; // Return the response data, which could be the created task or a success message
  } catch (error) {
    console.error('Error creating task:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


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
