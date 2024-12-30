import mongoose from "mongoose";
import TaskModel from "../model/TasksModel.js";

export const CreateTask = async(req,res)=>{
    try{
        let reqBody=req.body;
        let user_id=req.headers['user_id'];
        reqBody.user_id=user_id;

        await TaskModel.create(reqBody);
        return res.json({"Status":"Success","Message":"Task Created Successfully"});
    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
    
}

export const UpdateTaskStatus = async(req,res)=>{
    try{
        let id=req.params.id;
        let status=req.params.status;
        let user_id=req.headers['user_id'];

        await TaskModel.updateOne({"_id":id,"user_id":user_id},{status:status});

        return res.json({"Status":"Success","Message":"Update Task Status Successfully"});
    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
    
}

export const TaskListByStatus = async(req,res)=>{
    try{
        let status=req.params.status;
        let user_id=req.headers['user_id'];

        let data = await TaskModel.findOne({"status":status,"user_id":user_id});

        return res.json({"Status":"Success","Message":"User Task List By Status","data":data});
    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
    return res.json({"Status":"Success","Message":"User TaskListByStatus Successfully"});
}

export const DeleteTask = async(req,res)=>{
    try{
        let id=req.params.id;
        let user_id=req.headers['user_id'];

        await TaskModel.deleteOne({"_id":id,"user_id":user_id});
        return res.json({"Status":"Success","Message":"User Task Delete Successfully"});

    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
}

export const CountTask = async(req,res)=>{
    try{
        let user_id=req.headers['user_id'];
        let ObjectID=mongoose.Types.ObjectId;
        let user_id_object=new ObjectID(user_id);

        let data=await TaskModel.aggregate([
            {$match:{user_id:user_id_object}},
            {$group:{_id:"$status",count:{$count:{}}}}
        ]);

        return res.json({"Status":"Success","Message":"User Count Task by status","data":data});

    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
}