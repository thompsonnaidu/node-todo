const express=require("express");
const router=express.Router();
const TaskOperation=require('./../operation/TaskOperation');
const { check, validationResult ,param} = require('express-validator');
const auth=require("../middleware/auth");

// @route get api/task/list
// @desc get the list of task
// Private route
router.get('/list/:page',auth,[param('page').isNumeric().withMessage("should be a number")],async (req,res)=>{

    try{

        const {page}=req.params;    
        const validationError= validationResult(req);
        if (!validationError.isEmpty())
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
// Private route
router.post('/',auth,[
    check('status').isIn(['inprogress','complete','not_started'])
                   .withMessage("status should be either one of inprogress,complete,not_started"),
    check('title').not().isEmpty().withMessage("Please pass the title")
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

// @route delete api/task/:id
// @desc delete record to the database
router.delete('/:id',auth,[param('id').isMongoId().withMessage("Please pass a valid ID")],async (req,res)=>{

    try{

        const {id}=req.params;    
        const validationError= validationResult(req);
        if (!validationError.isEmpty())
        {
            return res.status(400).json({"success":false,"error":validationError.errors})
        }
        let operation =new TaskOperation();
        let result= await operation.removeTask(id);
        if(!result.isdeleted){
            return res.status(400).json({"success":false,error:result.error})
        }
        res.status(200).json({
                success:true,
                id:result.id          
        });
    }catch(error){
            res.status(500).json({
                "success":false,
                "error":error.message
            })
    }    
})

// @route put api/task/:id
// @desc update record to the database
router.put('/:id',auth,[param('id').isMongoId().withMessage("Please pass a valid ID"),
    check('status').optional().isIn(['inprogress','complete','not_started'])
                   .withMessage("status should be either one of inprogress,complete,not_started"),
    check('title').optional().not().isEmpty().withMessage("Please pass the title")
],async (req,res)=>{

    try{
        // validate the request
        const {id}=req.params;    
        const validationError= validationResult(req);
        if (!validationError.isEmpty())
        {
            return res.status(400).json({"success":false,"error":validationError.errors})
        }

        // build our task object
        const {title,status}=req.body;
        const updatedTask={id:id}
        
        if (title) updatedTask.title=title;
        // check if the status has one of either value ('not_started,complete,inprogress')
        if (status) updatedTask.status=status;
        
        let operation =new TaskOperation();
        let result= await operation.updateTask(updatedTask);
        // build result based on result
        if(!result.isUpdated){
            return res.status(400).json({"success":false,error:result.error})
        }
        res.status(200).json({
                success:true,
                task:result.data          
        });
    }catch(error){
            res.status(500).json({
                "success":false,
                "error":error.message
            })
    }    
})

module.exports=router;