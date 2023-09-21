const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const Vendor=require('../models/vendorModel');
const cookieParser=require('cookie-parser')
app.use(cookieParser())
//check user login status 
exports.authVendor=async(req,res,next)=>{
try{

    const token=req.cookies.authVendor;
    if(!token){
        res.status(404).json({
            success:false,
            message:"Please Login to access the resource"
        })
        return ;
    }else{
        const decode=await jwt.verify(token,process.env.SECRETKEY)
        req.vendor=await Vendor.findById(decode.vendorId);
        if(req.vendor){
            next();
        }else{
            res.status(404).json({
                success:false,
                message:"Please Login to access the resource"
            })
            return ;
            
        }
    }
}catch(err){
    return next(new Error("please Login First"));
}
}