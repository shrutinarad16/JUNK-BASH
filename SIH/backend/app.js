const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express();
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
const dbconnect=require('./server');
dotenv.config({path:'./config.env'});   
const CredentialsCustomer=require('./customer/routers/credentialsRouter');
const CredentialsVendor=require('./vendor/routers/credentialsRouter');
const ProductVendor=require('./vendor/routers/productRouter');
const ProductCustomer=require('./customer/routers/productRouter');
dbconnect();
app.use(cors({
    credentials: true,
    origin:process.env.WEBLINK,
    methods:["GET","POST","DELETE","PUT"]
}));

app.get('/',(req,res)=>{
res.send("working..."); 
})
app.use('/api/v1',CredentialsCustomer);
app.use('/api/v1',CredentialsVendor);
app.use('/api/v1',ProductCustomer);
app.use('/api/v1',ProductVendor);
app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})