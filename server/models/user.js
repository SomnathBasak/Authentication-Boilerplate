const mongoose=require('mongoose');
//const bcrypt=require('bcryptjs')


const userSchema=new mongoose.Schema({
    name:{type:String,trim:true,required:true,max:32},
    email:{type:String,trim:true,required:true,lowercase:true,max:32,unique:true},
    username:{type:String,trim:true,required:true,max:12},
    password:{type:String,required:true,max:16},
    cpassword:{type:String,required:true,max:16},
    role:{type:String,default:'subscriber'},
    resetPasswordLink:{data:String},

},
{timestamps:true})



module.exports=mongoose.model('User',userSchema)



