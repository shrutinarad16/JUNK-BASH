const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const customerSchema=new mongoose.Schema({
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
     required:true,
    },
    
    date:{
        type:Date,
        default:Date.now
    },
    // implement colour feature (safe ?)
    safe:{
        type:Number,
        default:0
    },
})
customerSchema.post('save', function(error, doc, next) {
  
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
  });

customerSchema.pre('save',async function(next){
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
module.exports=new mongoose.model('customer',customerSchema);