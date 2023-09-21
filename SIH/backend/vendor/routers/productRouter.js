const express=require('express');
const Product=require('../models/productModel');
const router=express.Router();
const { authVendor } = require('../middleware/authVendor');


// creating product
const createProduct=async(req,res)=>{

    // have to also check for image , do this at the end 
     try{
      // console.log(req);
        req.body.user=req.vendor._id;
      const product=await Product.create(req.body);
      res.status(201).json({
        success:true,
        message:"Prodect created Successfully"
      })
     }catch(err){
        // console.log(err);
        res.status(400).json({
            success:false,
            message:err.message
          })
     }

}

router.route('/create/product').post(authVendor,createProduct);




// show his all product
const getProduct=async(req,res)=>{
  try{
const product=await Product.find({user:req.vendor._id});
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
router.route('/get/vendor/product').get(authVendor,getProduct);

// Update product data
const updateProduct=async(req,res)=>{

    // have to also check for image , do this at the end 
     try{
      // console.log(req);
      const product = await Product.findOneAndUpdate(
        {_id:req.body._id,user:req.vendor._id},  
        req.body,   // Update with the new data
        { 
          new: true,   // Return the updated document
          runValidators: true, // Run validation on update
          useFindAndModify: false // Use the new findOneAndUpdate method
        }
      );
      if(product){

        res.status(201).json({
          success:true,
          message:"Prodect Updated Successfully"
        })
      }else{
        res.status(400).json({
          success:true,
          message:"Prodect Not find"
        })
      }
     }catch(err){
        // console.log(err);
        res.status(400).json({
            success:false,
            message:err.message
          })
     }

}

router.route('/update/product').put(authVendor,updateProduct);

// delete Product  
const deleteProduct=async(req,res)=>{

    // have to also check for image , do this at the end 
     try{
      // console.log(req);
      const product = await Product.findOneAndDelete(
        {_id:req.body._id,user:req.vendor._id},  
     
      );
      if(product){

        res.status(204).json({
          success:true,
          message:"Prodect deleted Successfully"
        })
      }else{
        res.status(400).json({
          success:true,
          message:"Prodect Not find"
        })
      }
     }catch(err){
        // console.log(err);
        res.status(400).json({
            success:false,
            message:err.message
          })
     }

}

router.route('/delete/product').delete(authVendor,deleteProduct);



// making number visible 
const showNumber=async(req,res)=>{
  try{
    
    let product=await Product.findOne({_id:req.body._id,user:req.vendor._id});
    if(product){
      product.phoneno=product.phoneno==0?req.vendor.phoneno:0;
      await product.save();
      if(product.phoneno!=0){
        res.status(201).json({
          phoneno:product.phoneno,
          success:true,
          message:"You can access the number now",
        })
      }else{
        res.status(201).json({
          phoneno:product.phoneno,
          success:true,
            message:"You can not access the number now",
        })
        
      }
    }else{
      res.status(400).json({
        success:false,
        message:"Try after sometime",
      })
      
    }
  }catch(err){
    res.status(400).json({
      success:false,
      message:err.message
    })
  }
}

router.route('/vendor/show/number').post(authVendor,showNumber);


// number status


module.exports=router;