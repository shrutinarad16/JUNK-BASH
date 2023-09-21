const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const Customer=require('../models/customerModel');
const cookieParser=require('cookie-parser')
app.use(cookieParser())

// check user login status 
exports.authCustomer=async(req,res,next)=>{
try{

    // console.log(req.cookies.jwt);
    const token=req.cookies.authCustomer;
    if(!token){
        res.status(404).json({
            success:false,
            message:"Please Login to access the resource"
        })
    }else{
        const decode=await jwt.verify(token,process.env.SECRETKEY)
        req.customer=await Customer.findById(decode.customerId);
        if(req.customer){
            
            next();
        }else{
            res.status(404).json({
                success:false,
                message:"Please Login to access the resource"
            })
        }
    }
}catch(err){
    return next(new Error("please Login First"));
}
}