const express=require('express')
const router=express.Router();



const {read,update}=require('../controllers/user');
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');

router.get('/user/:id',requireSignin, read)
router.put('/user/update/',requireSignin, update)
router.put('/admin/update/',requireSignin,isAdmin, update)


 module.exports=router;
