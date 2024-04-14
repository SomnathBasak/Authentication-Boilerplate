const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const DB=process.env.DATABASE

 mongoose.connect(DB)
.then(()=>{
    console.log('Database is connected');
})
.catch((err)=>console.log('Database is not connected',err))
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')      //importing routes


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())             //allows all origins
if(process.env.NODE_ENV='development'){
    app.use(cors({origin:process.env.CLIENT_URL}))
}

//middleware
app.use('/api',authRoutes) 
app.use('/api',userRoutes)      



const PORT=process.env.PORT
app.listen(PORT,()=>{
console.log(`Server is running on port: ${PORT}`);
})