const express=require("express");
const router=express.Router();
const TaskOperation=require('./../operation/TaskOperation');
const { check, validationResult ,param} = require('express-validator');

// @route get api/task/list
// @desc get the list of task
router.get('/list/:page',[param('page').isNumeric().withMessage("should be a number")],async (req,res)=>{

    try{

        const {page}=req.params;    
        const validationError= await validationResult(req);
        if (validationError.errors.length > 0)
        {
            return res.status(400).json({"success":false,"error":validationError.errors})
        }
        let operation =new TaskOperation();
        let taskList= await operation.getPaginationTaskList(page,10);
        res.status(200).json({
                success:true,
                task:taskList          
        });
    }catch(error){
            res.status(500).json({
                "success":false,
                "error":error.message
            })
    }    
})

// @route post api/task/
// @desc insert record to the database
router.post('/',[
    check('status').isIn(['inprogress','complete','not_started'])
                   .withMessage("status should be either one of inprogress,complete,not_started"),
    check('title').not().isEmpty().withMessage("Please pass the title")
],async (req,res)=>{
    try {
        // validate the request
        let validationError= await validationResult(req);
        if(validationError){
            res.status(400).json({
                "success":false,
                "message":validationError.errors
            });
            return
        }
        let operation =new TaskOperation();
        const {title,status}=req.body;
        // insert the record
        let insertedTask= await operation.insertTask(title,status);
        res.status(200).json({
                success:true,
                task:insertedTask        
        });
    } catch (error) {
        console.log(typeof error,error.message);
        res.status(500).json({
            "success":false,
            "error":error.message
        })
    }
})


module.exports=router;