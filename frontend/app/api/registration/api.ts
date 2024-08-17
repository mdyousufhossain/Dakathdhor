// lib/api.ts

export async function apiRequest(endpoint: string, method: string, data?: any) {
    const url = `http://localhost:9000/api/v1${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include', // to include cookies
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }
  
    return response.json();
  }
  