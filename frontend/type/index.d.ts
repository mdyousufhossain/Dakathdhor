export interface User  {
    username: string
    mobile?: string
    email?: string
    batman?: boolean
    taskgiven?: Schema.Types.ObjectId[]
    taskCompleted?: Schema.Types.ObjectId[]
    messages?: Schema.Types.ObjectId[]
    location?: string
    avatar?: string
    bio?: string
    isOnline: boolean
    createdAt: Date
    _id: Types.ObjectId
  }
  
  setUser:{ (user: {
    username: string
    mobile?: string
    email?: string
    batman?: boolean
    taskgiven?: Schema.Types.ObjectId[]
    taskCompleted?: Schema.Types.ObjectId[]
    messages?: Schema.Types.ObjectId[]
    location?: string
    avatar?: string
    bio?: string
    isOnline: boolean
    createdAt: Date
    _id: Types.ObjectId
  }) => void
}
