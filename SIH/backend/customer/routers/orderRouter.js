const express =require('express');
const Order=require('../models/orderModel');
const Product=require('../../vendor/models/productModel');
const {authCustomer}=require('../middleware/authCustomer');
const router=express.Router();
// // create new order

const newOrder=async(req,res)=>{
    try{
  const {shippingInfo,orderItem,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    const order=await Order.create({
        shippingInfo,
        orderItem,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        customer:req.customer._id
    });
    res.status(201).json({
        success:true,
        message:"order Placed successfully"
    })
}catch(err){
        res.status(400).json({
            success:true,
            message:err.message
        })
    }
}
router.route('/customer/order/route').post(authCustomer,newOrder);



// exports.newOrder=catchAsyncError(async(req,res,next)=>{
    // const {shippingInfo,orderItem,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;
//     const order=await Order.create({
//         shippingInfo,
//         orderItem,
//         paymentInfo,
//         itemPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//         paidAt:Date.now(),
//         user:req.user._id
//     });
//     res.status(201).json({
//         success:true,
//         order
//     })
// })



// // get single order

// exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
//     // / populate is a simple function which found the user email and name from user collections by the help of user id which we get from order user id 
//     const order=await Order.findById(req.params.id).populate("user","name email");
//     if(!order){
//         return next(new ErrorHandler("Order Not Found With this id ",404) );
//     }
//     res.status(200).json({
//         success:true,
//         order
//     })
// })


// // get logged in user order 

// exports.myOrders=catchAsyncError(async(req,res,next)=>{
//     // / populate is a simple function which found the user email and name from user collections by the help of user id which we get from order user id 
//     const orders=await Order.find({user:req.user._id});
//     res.status(200).json({
//         success:true,
//         orders
//     })
// })

// // get all orders -->admin



// exports.getAllorders=catchAsyncError(async(req,res,next)=>{
//     // / populate is a simple function which found the user email and name from user collections by the help of user id which we get from order user id 
//     const orders=await Order.find();
//     let totalAmount=0;
//     orders.forEach((orders)=>{
//         totalAmount+=orders.totalPrice;
//     })
//     res.status(200).json({
//         success:true,
//         totalAmount,
//         orders
//     })
// })
// // get orders status -->admin



// exports.UpdateOrder=catchAsyncError(async(req,res,next)=>{
//     // / populate is a simple function which found the user email and name from user collections by the help of user id which we get from order user id 
//     const order=await Order.findById(req.params.id);
//     if(!order){
//         return next(new ErrorHandler("order not found for this id ",404))
//      }
//     if(order.orderStatus==="Delivered"){
//         return next(new ErrorHandler("you have already delivered this order",400))
//     }
//     if(req.body.status==="Shipped"){

//         order.orderItem.forEach (async(o)=>{
//             await updateStock(o.product,o.quantity);
//         })
//     }
//    order.orderStatus=req.body.status;
//    if(req.body.status==="Delivered"){
//        order.deliveredAt=Date.now();
//     }
//     await order.save({validateBeforeSave:false});
//     res.status(200).json({
//         success:true,
//     })
// })
// async function updateStock(id,quantity){
//     const product=await Product.findById(id);
//     console.log("sgfs-->",product.stock);
//     product.stock=(product.stock)-quantity;
    
//     await product.save({validateBeforeSave:false});
// }


// // Delete a order -->admin



// exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
//     // / populate is a simple function which found the user email and name from user collections by the help of user id which we get from order user id 
//     const order=await Order.findById(req.params.id);
//      if(!order){
//         return next(new ErrorHandler("order not found for this id ",404))
//      }
//     await order.remove();
//     res.status(200).json({
//         success:true,
//     })
// })

module.exports=router;