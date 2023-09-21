const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"Name should containe atleast 3 char"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password lenght should be 8"]

    },
    phoneno:{
     type:Number,
     required:true
    },
    aadhaar_no:{
        type:Number,
        required:true,
    },  
    aadhaar_image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    // this value is important , first we check all details of user then make them allow to use vendors plateform 
    verified:{
     type:Boolean,
     default:false
    },
    // implement colour feature (safe to buy from this user ?)
    safe:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
})

vendorSchema.post('save', function(error, doc, next) {
  
    if (error.name === 'MongoServerError' && error.code === 11000) {
        // Duplicate email error
        next(new Error('Email already exists'));
    }
    else if(error.name==='ValidationError'){
        console.log("sifjsnf");
    next(new Error(error.message));
    } 
    else {
      next(error);
    }
  });

vendorSchema.pre('save',async function(next){
    try{
    if(!this.isModified('password')){
        return next();
    }
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    next();

    }catch(error){
        next(error)
    }
  })
module.exports=new mongoose.model('vendors',vendorSchema);