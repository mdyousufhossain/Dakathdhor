import { Document, model, Schema, Types } from 'mongoose'

/**
 * This is a attentive task .. 
 * 
 * task .. task will have identification who given the emergency  task  
 * a message  , probably contact information ? 
 * of course dispatch location coordination  that will give the google map ?
 * and hidden from user  ? if the task is compelted only can moved by the user and if all participent vote then task is completed then it will remove and count as completed d
 * 
 * id ,  message , user_who_posted , coordination , contact information ? optional or crucial .. in future we will add video , photo , audio , all the media item in post 
 * 
 * message will have separted  scheme , id , user , text , and post or personal link ? 
 * maybe we will separted location shema who knows 
 */


interface IUser extends Document {
  username: string
  password: string
  mobile?:string
  email?:string
  batman?:string // people who will voulenteer themselve to help the people , 
  taskgiven?:Schema.Types.ObjectId[] // we will separted schema to create task or emergency help it will be create new dimention to helps people like what typpe of help they need ... like freeing the seven sister perhaps ? ;> lord babar will be happy 
  taskCompleted?:Schema.Types.ObjectId[] /// task complete is bit complex bcz in order to make this func happy we need actually complete the task which our gen is most feard of, boy why dont you complete the assignment i rather oppose the dickraider hasina regim and free my country ...let's talk about work now when task giver assure their helped is fullfilled they can press compelted button otherwise , participant can vote which will be tricky to make but hey i love pain ... if most of the particiment vote this task is compete then task will be completed 
  /**
   * @requires task creator authorizes
   * or
   * @requires  most participant vote
   */ 
  messages?: Schema.Types.ObjectId[] // This field should be optional if it's not always required
  location?: { // maybe next update we have use separted schema since location will be a big deal :> 
    // Make location optional as well
    // blud i hardly any idea with the location coordniate i usually ddint work this is will change in test mode 
    type: 'Point' // Since we are using a 2dsphere index, 'Point' is the only allowed value /**maybe someday we will use relational database then we can use more accuarte google api or somethi'n 
    coordinates: [number, number] // Coordinates are an array of two numbers [longitude, latitude] aah boring
  };
  avatar?:string; // in future update 
  bio?:string;
  isOnline: boolean
  /**
   * these are sect concern i think we need more attention here but my tiny head cannot think otherwise 
   * but i dont like the idea between every request endup coming to the database its kinda costly we will do something on this .. maybe on user cache if tha limit is cross that we will reach database tell them hey lock this bas* he tryna hax 
   * and that basta will wait until the cool down ? like in front end , so their nonsene garbage will not interfare the database 
   */
  loginAttempts: number 
  accountLockedUntil?: Date | null // only date i have in my life
  createdAt: Date
  refreshToken?: string // Optional, since not all users may have a refresh token
  _id: Types.ObjectId
  role?:[number]
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  batman: {
    type:Boolean,
    default:false
  },
  mobile: {
    type:String
  },
  email: {
    type:String
  },
  role: {
    type:[Number]
  },
   taskgiven:[{ type: Schema.Types.ObjectId, ref: 'Task', required: true }],
   taskCompleted:[{ type: Schema.Types.ObjectId, ref: 'Task', required: true }],
   messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true }],
  bio: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type:String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number], // coordinates must be an array of numbers
    },
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  // Add loginAttempts field to track failed login attempts
  loginAttempts: {
    type: Number,
    default: 0,
  },

  // Add accountLockedUntil field to track lockout expiration time
  accountLockedUntil: {
    type: Date,
    default: null, // Indicates that the account is not locked
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

// Add a 2dsphere index to the location field for geospatial queries
/**
 * i dont belive i will use this cheap method  , i will improvee this im promise but let's just say my eyes is closed now  
 */
userSchema.index({ location: '2dsphere' })

const User = model<IUser>('User', userSchema)

export default User
