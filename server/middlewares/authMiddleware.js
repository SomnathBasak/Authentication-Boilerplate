const jwt=require('jsonwebtoken');
const User=require('../models/user')


// exports.requireSignin=Jwt({
//     secret:process.env.JWT_SECRET_KEY,
//     algorithms: ["HS256"]
// })
exports.requireSignin=async(req,res,next)=>{
    try {
        const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET_KEY)
        req.user=decode
        next();
    } catch (error) {
        res.status(400).json({error:'Unauthorized Http'})
        console.log(error);
    }
}

// exports.adminMiddleware=(req,res,next)=>{
//     User.findById({_id:req.user._id})
// }

exports.isAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user.id)
        if(user.role!='admin'){
            return res.status(400).json({error:'Admin resource..Unauthorize Access!'})
        }else{
            req.profile=user;
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Unauthorize Access'})
    }
}