const express=require('express')
const router=express.Router();
const {signup,accountActivation,signin, forgotPassword, resetPassword}=require('../controllers/auth')

//import validetor
const {userSignupValidator,userSigninValidator, forgotPasswordValidator, resetPasswordValidator}=require('../validetors/auth')
const {runValidation}=require('../validetors')

router.post('/signup',userSignupValidator,runValidation,signup)
router.post('/account-activation',accountActivation)
router.post('/signin',userSigninValidator,runValidation,signin)

router.post('/forgot-password',forgotPasswordValidator,runValidation,forgotPassword)
router.put('/reset-password/',resetPasswordValidator,runValidation,resetPassword)

module.exports=router;
