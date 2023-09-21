const mongoose =require('mongoose');


// creating product schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"please Enter product category"],
        
    },
    stock:{
        type:String,
        required:[true,"please Enter product stock"],
        maxLength:[3,"stock cannot exceed more than 999"],
        default:1
        
    },
    ratings:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"customer",
                required:true
        
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"vendors",
        required:true

    },
    phoneno:{
        type:Number,
        default:0
    },
    negotiation:[
{
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"custome",
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:[this.price-this.price*20/100,"Not Allowed"]
    }
}
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})
// exporting to controller

productSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        // Duplicate email error
        next(new Error('Email already exists'));
    }
    else if(error.name==='ValidationError'){
    next(new Error(error.message));
    } 
    else {
      next(error);
    }
  })
module.exports=new mongoose.model('product',productSchema);