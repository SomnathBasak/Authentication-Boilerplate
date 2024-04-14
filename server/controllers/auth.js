const User=require('../models/user')
//import { useParams } from 'react-router-dom';
//import ForgotPassword from './../../client/src/components/ForgotPassword';
const {expressjwt:Jwt} = require("express-jwt");
const jwt=require('jsonwebtoken');
const sgMail=require('@sendgrid/mail');
const bcrypt=require('bcryptjs')
const _=require('lodash');
const user = require('../models/user');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


exports.signup=async(req,res)=>{
    const {name,email,username,password,cpassword}=req.body;
    try {
        const checkEmail=await User.findOne({email});
        
            if(checkEmail){
                return res.status(401).json({error:'Email Already Exists'});
            }
            const checkUser=await User.findOne({username});
            if(checkUser){
                return res.status(401).json({error:' Username Already Exists'});
            }
            if(password!==cpassword){
                return res.status(401).json({error:'Password does not match'});
            }
            const token=jwt.sign({name,email,username,password,cpassword},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'30m'})
    
            const emailData={
                from: process.env.EMAIL_FROM,
                to:email,
                subject:'Account Activation Link',
                html:`
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                </hr>
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
                `
            }
            const sent=await sgMail.send(emailData)
            if(sent){
                return res.json({message:`Email has been sent to ${email}.Please verify your email to Register`})
                }          
        } catch (error) {
            return res.status(400).json({error:'Internal Server Error'})
        }        
    }

exports.accountActivation=async(req,res)=>{
    try {
        const {token}=req.body
    const verify=jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION)
    if(verify){
        const {name,email,username,password,cpassword}= jwt.decode(token)
            const salt=await bcrypt.genSalt(10)
            const hashPassword=await bcrypt.hash(password,salt)
            const userCreate= await User.create({name,email,username,password:hashPassword,cpassword:hashPassword})
                if(!userCreate){
                    return res.status(401).json({error:'User cannot save in Database'})
                }
                return res.status(201).json({
                    message:'Signup Successfull! Please Singin'
                })
    }else{
        return res.status(401).json({error:'Expired link signup again'})
    }
    } catch (error) {
        console.log('Account Activation error');
        return res.status(401).json({error:'Already Activated'})     
    }   
}

exports.signin=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({error:'Invalid Username or Password'})
        }
        const match=await bcrypt.compare(password,user.password)
        if(match){
            const token= jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
            const {id,email,name,username,role}=user
            return res.json({message:'Signin Successfull',token,user:{id,email,name,username,role}})
        }else{
            return res.status(400).json({error:'Invalid Username or Password'})
        }       
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Internal Server Error'})
        
    }
    
}


// exports.forgotPassword=async(req,res)=>{
//     try {
//         const { email } = req.body
//     if (email) {
//       const user = await User.findOne({ email: email })
//       if (user) {
//         const secret = user.id + process.env.JWT_RESET_PASSWORD
//         const token = jwt.sign({ userID: user.id,name:user.name }, secret, { expiresIn: '15m' })
//             const emailData={
//                 from: process.env.EMAIL_FROM,
//                 to:email,
//                 subject:'Password Reset Link',
//                 html:`
//                 <h1>Please use the following link to reset your password</h1>
//                 <p>${process.env.CLIENT_URL}/auth/password/reset/${user.id}/${token}</p>
//                 </hr>
//                 <p>This email may contain sensitive information</p>
//                 <p>${process.env.CLIENT_URL}</p>
//                 `
//             }
                        
//                 const sent=await sgMail.send(emailData)
//                 if(sent){
//                 return res.json({message:`Email has been sent to ${email}.Please verify your email to Reset Password`})  
//             }else{
//                     return res.json({error:'Error in reset link'})
//                 }                
//             }else{
//                 return res.status(400).json({error:'User not found'})
//             }
//             }
//         }catch (error) {
//         console.log('Error in forgot password',error);
//         return res.status(400).json({error:'Internal Server Error'})
//     }
// }
// exports.resetPassword=async(req,res)=>{
    
//     const { password, cpassword } = req.body
//     const { id, token,name } = req.params
//     if(!password||!cpassword){
//         return res.status(402).json({error:'Please fill'})
//     }
//     const user = await User.findById(id)
//     const new_secret = user.id + process.env.JWT_RESET_PASSWORD
//     try {
//       jwt.verify(token, new_secret)
//       if (password && cpassword) {
//         //console.log(password,cpassword);
//         if (password !== cpassword) {
//           return res.status(402).json({error: "Password does not match" })
//         } else {
//           const salt = await bcrypt.genSalt(10)
//           const newHashPassword = await bcrypt.hash(password, salt)
//           //await User.findByIdAndUpdate(user.id, { $set: { password: newHashPassword,cpassword:newHashPassword } })
//           await User.findByIdAndUpdate(user.id,{ password: newHashPassword,cpassword:newHashPassword })
//           res.status(200).json({message: "Password Reset Successfully" })
//         }
//       } else {
//         res.status(400).json({error: "All Fields are Required" })
//       }
//     } catch (error) {
//       //console.log(error)
//       res.status(422).json({ error: "Token expired please try again" })
//     }
//   }

exports.forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email:email})
        if(!user){
            console.log('User not found');
            return res.status(400).json({error:'User Not Found'})
        }
        const token=jwt.sign({email,name:user.name},process.env.JWT_RESET_PASSWORD,{expiresIn:'10m'})
    
            const emailData={
                from: process.env.EMAIL_FROM,
                to:email,
                subject:'Reset Password Link',
                html:`
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                </hr>
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
                `
            }
            const sent=await sgMail.send(emailData)
            if(sent){
                return res.json({message:`Email has been sent to ${email}.Please verify your email to Reset password`,token})
                }

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in forgot password'})
    }
}

exports.resetPassword=async(req,res)=>{
    try {
        const {token,password,cpassword}=req.body;
        if(password!==cpassword){
            return res.status(400).json({error:'Password Does Not Match'})
        }
        const decoded=jwt.verify(token,process.env.JWT_RESET_PASSWORD)
        if(!decoded){
            console.log('token expired');
            return res.status(400).json({error:'Expired Link! Please Try Again'})
        }
        const hash=await bcrypt.hash(password,10)
        const filter={email:decoded.email}
        const update={password:hash,cpassword:hash}
        const option={new:true}
        
        const updateUser=await User.findOneAndUpdate(
            filter,update,option
        ).select('-password')
        if(!updateUser){
            console.log('update failed');
            return res.status(400).json({error:'Not Updated'})
        }
        res.status(200).json({message:'Succesfull'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Expired Link! Please Try Again'})
    }
}



    
















    