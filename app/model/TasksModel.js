import mongoose, { mongo } from "mongoose";
const TaskSchema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        description:{type:String,require:true},
        status:{type:String,required:true},
        user_id:{type:mongoose.Schema.Types.ObjectId,required:true}
    },
    {timestamps:true,versionKey:false}
);

const TaskModel = mongoose.model('tasks',TaskSchema);

export default TaskModel;