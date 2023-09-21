const mongoose =require('mongoose')
const dbconnect=()=>{
        mongoose.connect(process.env.DBURI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true
        }).then(
            console.log("connection created successfully")
            )
        .catch((err)=>{
            console.log("something went wrong ->",err.message)
        }   );
}

module.exports=dbconnect;