import { model , Document , Types , Schema } from "mongoose";

interface ITask extends Document {
    taskGiver : Schema.Types.ObjectId[] // user who asked for help 
    type : Object[] // type of help , it depend how much help will require its important because freaky alogirtum will improve the standout the for help 
    message : string // user demand like bring weapons or armforcement ,, this is dang* be careful , 
    media : string // this is probably for the future , user can add multiple different type of media thing , like pic, audio ,video , or any proof of the cultpit for now we will add picture , 
    location: string
    isSolved: boolean // it depend taskGiver they can tab and completed or partiicant can vote 
    batmans : Schema.Types.ObjectId[]
}

const TaskSchema = new Schema<ITask>({
    taskGiver: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    type: [{ type: String, required: true }],
    message: { type: String, required: true },
    media: [{ type: String }], // Defaulting to an array to allow for future extensions 
    location: [{type:String , required:true}],
    isSolved: { type: Boolean, default: false },
    batmans: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// Create a model
const Task = model<ITask>('Task', TaskSchema);

export default Task;