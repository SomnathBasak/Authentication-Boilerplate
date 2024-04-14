//const user = require('../models/user')
const bcrypt=require('bcryptjs')
const User=require('../models/user')
exports.read=async(req,res)=>{
    const userId=await req.params.id
    const user=await User.findById(userId)
    if (!user){
       return res.status(400).json({error:'User not found'})
    }
        user.password=undefined
        user.cpassword=undefined
        res.json({user})    
}

exports.update=async(req,res)=>{
     const {name,password,username}=req.body

     const user=await User.findOne({_id:req.user.id})
     console.log(user.password);
    if(!user){
        return res.status(400).json({
            error:'User not found'
        })
    }
    
    if(!name){
        return res.status(400).json({
            error:'Name is required'
        })
    }else{
        user.name=name;
    }

    if(!password){
        {
            return res.status(400).json({
                error:'Enter password to update your profile'
            })
        }
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(400).json({error:'Wrong password'})
    }
        const updatedUser=await user.save()
        if(!updatedUser){
            return res.status(400).json({error:'User Update fail'})
                 
         }
         return res.status(200).json({message:'User Updated',updatedUser})
    }    
    

        
        
         

    // await req.user.save((err,updateUser)=>{
    //     if(err){
    //             return res.status(400).json({
    //                 error:'User Update fail'
    //             })

    //     }
    //     updateUser.hashPassword=undefined
        
    // })
    

// exports.update=(req,res)=>{
//     console.log(req.params.name);
//     res.send(req.params)
//     // try {
//     //     const {name,password}=data
//     //     if(req.body.name){
//     //         data.name=req.body.name
//     //     }
//     //     let user=await User.findByIdAndUpdate(req.user._id,data,{
//     //         new:true
//     //     })
//     //     res.json({user})
//     //     console.log(user);
//     // } catch (error) {
//     //     if(error.code===400){
//     //         return res.status(400).json({
//     //             error:'Error'
//     //         })
//     //     }
//     // }
// }

// exports.adminMiddleware=(req,res,next)=>{

// }

