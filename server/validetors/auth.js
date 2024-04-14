const {check}=require('express-validator');

exports.userSignupValidator=[
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

    check('email')
    .isEmail()
    .withMessage('Email must be valid'),

    check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required'),

    check('password')
    .isLength({min: 5})
    .withMessage('Password must be atleast 5 characters'), 
    
    check('cpassword')
    .isLength({min: 5})
    .withMessage('Password and Confirm Password must be same')
];

exports.userSigninValidator=[
       check('username')
       .not()
    .isEmpty()
    .withMessage('Username is required'),

    check('password')
    .isLength({min: 5})
    .withMessage('Password is required')    
];

exports.forgotPasswordValidator=[
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email must be valid'),
];
exports.resetPasswordValidator=[
    check('password')
    .not()
    .isEmpty()
    .isLength({min:5})
    .withMessage('Password must be atleast 5 characters'),

    check('cpassword')
    .not()
    .isEmpty()
    .isLength({min:5})
    .withMessage('Please confirm your password')
];