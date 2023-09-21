const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{type:String ,require:true},
        city:{type:String ,require:true},
        state:{type:String ,require:true},
        country:{type:String ,require:true,default:"india"},
        pincode:{
            type:Number,
            required:true
        },
        phoneNo:{
            type:Number,
            required:true
        }

    },

    orderItem:[
     {
        name:{
            type:String,
            require:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            required:true
        }

     }
    ],
    customer:{
        type:mongoose.Schema.ObjectId,
        ref:"customer",
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    paidAt:{
        type:Date,
        required:true
    },
    taxPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    itemPrice:{
        type:Number,
        default:0,
        required:true
    },
    orderStatus:{
        type:String,
        required:true,
        default:"processing"
    },
    deliveredAt:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=new mongoose.model('order',orderSchema);