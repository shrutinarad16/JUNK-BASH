const express=require('express');
const Product=require('../../vendor/models/productModel');
const {authCustomer}=require('../middleware/authCustomer');
const router=express.Router();

const getAllProduct=async(req,res)=>{
    try{
   const product=await Product.find({});
   res.status(200).json({
    product,
    success:true,
    message:"displaying the product"
   })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

router.route('/customer/get/all/product').get(getAllProduct);


// user / customer is submitting the review 

const setProductReview=async(req,res)=>{
    try{
        const {rating,comment,productId}=req.body;
        const review={
            user:req.customer._id,
            name:req.customer.name,
            rating:Number(rating),
            comment
        }
        const product=await Product.findById(productId);
        if(!product){
            res.status(400).json({
                success:false,
                message:"Product not found"
            })
            return;
        }
        const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.customer._id.toString())
        if(isReviewed){
             product.reviews.forEach(rev=>{
                if(rev.user.toString()===req.customer._id.toString())
                rev.rating=rating;
                rev.comment=comment
             })
        }else{
            product.reviews.push(review);
            product.numOfReviews=product.reviews.length;
        }
      
        let avg=0;
       product.reviews.forEach(rev=>{
            avg+=rev.rating;
        })
        product.ratings=avg/product.reviews.length;
        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,
            message:"Review was submitted successfully"
        })                 
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

router.route('/customer/set/product/review').post(authCustomer,setProductReview);

const deleteProductReview=async(req,res)=>{
    try{
        const product=await Product.findById(req.body.productId)
  if(!product){
    res.status(400).json({
        success:false,
        message:"product Not Found"
    })
    return ;
  }
  const id=req.customer._id.toString();
  const reviews= product.reviews.filter(r=>r.user.toString()!==id);
 
  let avg=0;
 reviews.forEach(rev=>{
      avg+=rev.rating;
  })
  let ratings=0;
  if(reviews.length!==0){
    ratings=avg/reviews.length;
  }
  const numOfReviews=reviews.length

  await Product.findByIdAndUpdate(req.body.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new :true,
    runValidators:true,
    useFindAndModify:false
  })
res.status(201).json({
    success:true,
    message:"Review Deleted Successfully"
})
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
router.route('/customer/delete/product/review').put(authCustomer,deleteProductReview);


// get all review 

const getAllReview=async(req,res)=>{
try{
const product=await Product.findById(req.body.productId);
if(!product){
    res.status(400).json({
        success:false,
        message:"product Not Found"
    })
    return ;
}
res.status(200).json({
    reviews:product.reviews,
    success:true,
})
}catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })
}
}
router.route('/get/all/review').get(getAllReview);
module.exports=router;