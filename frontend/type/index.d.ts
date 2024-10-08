export interface User {
  accessToken: string
  items: {
    userid: string
    username: string
  }
}

export interface userData {
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

export interface setUser {
  (user: {
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
  })
}

export interface createTask {
  author: string
  type: string
  message: string
  media?: string[]
  location: string
  isSolved?: boolean
  batmans?: string[]
}
