const express=require('express')
const Customer=require('../models/customerModel');
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const {authCustomer}=require('../middleware/authCustomer');
const router=express.Router();

// Router for register the Customer 
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
const customer=await Customer.create(req.body);
const payload={
    customerId:customer._id
}

const token=jwt.sign(payload,process.env.SECRETKEY,{expiresIn:process.env.EXPIRECT})

res.cookie('authCustomer', token, {
    expires:new Date(Date.now()+process.env.EXPIREC*60*60*1000),
    httpOnly: true,
  });
  res.status(201).json({
      success:true,
message:"Registration done successfully"    
})

}catch(err){
    res.status(500).json({
        success:false,
        message:err.message    
    })
}


}   
router.route('/customer/register').post(registerR);



// router for login the customer

const loginRouter=async(req,res)=>{
    try{
        const user=await Customer.findOne({email:req.body.email});
        if(user &&  await bcrypt.compare(req.body.password,user.password)){
            const payload={
                customerId:user._id
            }
            
            const token=jwt.sign(payload,process.env.SECRETKEY,{expiresIn:process.env.EXPIRECT})
            
            res.cookie('authCustomer', token, {
                expires:new Date(Date.now()+process.env.EXPIREC*60*60*1000),
                httpOnly: true,
            });
            // console.log(req);
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
    res.status(500).json({
        success:false,
       message:"Something went wrong, try after sometime"+err   
    })
}
}


router.route('/customer/login').post(loginRouter);



/// logout router 
const logoutCustomer=async(req,res)=>{
    
    // console.log(req);
    try{
        res.cookie('authCustomer', null, {
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
    router.route('/customer/logout').get(authCustomer,logoutCustomer);


module.exports=router;