const express=require('express')
const Vendors=require('../models/vendorModel');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const { authVendor } = require('../middleware/authVendor');
const router=express.Router();


// Router for register the vendor
const registerR=async(req,res)=>{
try{
if(req.body.password!=req.body.cpassword){
    res.status(400).json({
        success:false,
        message:"password doesnot match"
    })
    return;
}

if(String(req.body.phoneno).length!=10){
    res.status(400).json({
        success:false,
        message:"Enter correct Number"
    })
    return;
}
if(String(req.body.aadhaar_no).length!=12){
    res.status(400).json({
        success:false,
        message:"Enter correct No"
    })
    return;
}
const vendor=await Vendors.create(req.body);
const payload={
    vendorId:vendor._id
}

const token=jwt.sign(payload,process.env.SECRETKEY,{expiresIn:process.env.EXPIRECT})

res.cookie('authVendor', token, {
    expires:new Date(Date.now()+process.env.EXPIREC*60*60*1000),
    httpOnly: true,

  });
res.status(201).json({
success:true,
message:"Registration done successfully"    
})

}catch(err){
    if(err && err.name === 'ValidationError'){
        res.status(500).json({
            success:false,
            message:err.message
        })
        return;
    }
res.status(500).json({
    success:false,
   message:err.message  
})
}


}   
router.route('/vendor/register').post(registerR);



// router for login the vendors

const loginRouter=async(req,res)=>{
    try{
    const user=await Vendors.findOne({email:req.body.email});
    if(user &&  await bcrypt.compare(req.body.password,user.password)){
        const payload={
            vendorId:user._id
        }
        
        const token=jwt.sign(payload,process.env.SECRETKEY,{expiresIn:process.env.EXPIRECT})
        
        res.cookie('authVendor', token, {
            expires:new Date(Date.now()+process.env.EXPIREC*60*60*1000),
            httpOnly: true,
          });
        res.status(200).json({
            success:true,
            message:"Login Successfully"
        })
        return;
    }else{
        res.status(400).json({
            success:false,
            message:"wrong email and password"
        })
        return ;
    }
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
           message:"Something went wrong, try after sometime"+err    
        })
    }
    }
    
    
    router.route('/vendor/login').post(loginRouter);




/// logout router 
const logoutVendor=async(req,res)=>{
    try{
        res.cookie('authVendor', null, {
            expires:new Date(Date.now(0)),
            httpOnly: true,
        });
        res.status(200).json({
            success:true,
            message:"Logout Successfully",
        })
    }catch(err){
        res.status(500).json({ 
            success:false,
            message: err });
            
        }
    }
    router.route('/vendor/logout').get(authVendor,logoutVendor);






module.exports=router;