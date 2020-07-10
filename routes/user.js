// api/user/register -->{"success":true,data:{name:name,email:email}}
// api/user/login ---> {"success":true},{"success":false,"error":"i"}
const express=require("express");
const router=express.Router();
const UserOperation=require('./../operation/UserOperation');
const { check, validationResult ,param} = require('express-validator');

// @route post api/user/register
// @desc insert record to the database
router.post('/register',[
    check('name','please pass the empty string').not().isEmpty(),
    check('email','Please pass a valid email').isEmail(),
    check('password','password field is missing').not().isEmpty()
],async (req,res)=>{
    try {
        // validate the request
        let validationError= validationResult(req);
        if(!validationError.isEmpty()){
            res.status(400).json({
                "success":false,
                "message":validationError.errors
            });
            return
        }
        let operation =new UserOperation();
        const {name,email,password}=req.body;
        const newUser={name,email,password};
        // insert the record
        let insertedTask= await operation.registerUser(newUser);
        res.status(200).json({
                success:true,
                user:insertedTask        
        });
    } catch (error) {
        console.log(typeof error,error.message);
        res.status(500).json({
            "success":false,
            "error":error.message
        })
    }
})

// @route post api/user/login
// @desc perform the login operation
router.post('/login',[
    check('email','username is missing').isEmail(),
    check('password','password field is missing').not().isEmpty()
],async (req,res)=>{
    try {
        // validate the request
        let validationError= validationResult(req);
        if(!validationError.isEmpty()){
            res.status(400).json({
                "success":false,
                "message":validationError.errors
            });
            return
        }
        let operation =new UserOperation();
        const {email,password}=req.body;
        // check for login
        let verifiedUser= await operation.checkLogin(email,password);
        
        if(!verifiedUser.isVerified){
           return res.status(400).json({success:false,error:verifiedUser.error});
        }

        res.status(200).json({
                success:true,
                user:verifiedUser.data.id        
        });
    } catch (error) {
        res.status(500).json({
            "success":false,
            "error":error.message
        })
    }
})
module.exports=router;