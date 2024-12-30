import UsersModel from "../model/UsersModel.js";
import EmailSend from "../utility/emailUtility.js";
import { EncodeToken,DecodeToken } from "../utility/tokenUtility.js";
export const Registration = async(req,res)=>{
    try{
        let reqBody=req.body;
        let result=await UsersModel.create(reqBody);
        return res.json({"Status":"Success","Message":"User registration Successfully"});
    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
}

export const Login = async(req,res)=>{
    try{
        let reqBody=req.body;
        let data = await UsersModel.findOne(reqBody);
        if(data==null){
            return res.json({"Status":"fail","Message":"User not found"});
        }
        else{
            //Login Success Token Encode
            let token=EncodeToken(data['email'],data['_id']);
            return res.json({"Status":"Success","Token":token,"Message":"User login Successfully"});
        }
    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
    
}

export const ProfileDetails = async(req,res)=>{
    try{
        let user_id=req.headers['user_id'];
        console.log(user_id)
        let data = await UsersModel.findOne({"_id":user_id});
        return res.json({"Status":"Success","Message":"User profileDetails Successfully","data":data});

    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
}

export const ProfileUpdate = async(req,res)=>{
    try{
        let reqBody=req.body;
        let user_id=req.headers['user_id'];
        
        let data = await UsersModel.updateOne({"_id":user_id},reqBody);
        return res.json({"Status":"Success","Message":"User Profile Update Successfully"});

    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
    
}

export const EmailVerify = async(req,res)=>{
    try{
        let email=req.params.email;
        let data=await UsersModel.findOne({email:email});
        
        if(data===null){
            return res.json({"Status":"fail","Message":"User email does not exist"});
        }
        else{
            let code=Math.floor(100000+Math.random()*900000);
            let EmailTo=data['email'];
            let EmailText="Your Code is "+code;
            let EmailSubject = "Task Manager Verification Code";
            let EmailHTMLBody="";

            await EmailSend(EmailTo,EmailText,EmailSubject,EmailHTMLBody);
            console.log(code)
            let data1 = await UsersModel.updateOne({email:email},{otp:code});
            return res.json({"Status":"Success","Message":"Verification Code Send Successfully, Check Email",data: data1});
        }
        

    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
}

export const CodeVerify = async(req,res)=>{
    try{
        let email=req.params.email;
        let code=req.params.code;

        //verify user and code
        let data=await UsersModel.findOne({email:email,otp:code});

        if(data===null){
            return res.json({"Status":"fail","Message":"Wrong Verification Code"});
        }
        else{
            return res.json({"Status":"fail","Message":"Vefification Successfully"});
        }


    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
    return res.json({"Status":"Success","Message":"User CodeVerify Successfully"});
}

export const ResetPassword = async(req,res)=>{
    try{
        let reqBody=req.body;
        let data = await UsersModel.findOne({email:reqBody['email'],otp:reqBody['code']});
        if(data===null){
            return res.json({"Status":"fail","Message":"Wrong Verification Code"});
        }
        else{
            await UsersModel.updateOne({email:reqBody['email']},{
                otp:"0",password:reqBody['password']
            })
            return res.json({"Status":"Success","Message":"User Reset Password Successfully"});
        }
    }catch(error){
        return res.json({"Status":"fail","Message":error.toString()});
    }
}