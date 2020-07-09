const express=require("express");
const router=express.Router();
const TaskOperation=require('./../operation/TaskOperation');

// @route get api/task/list
// @desc get the list of task
router.get('/list/:page',async (req,res)=>{

    try{

        const {page}=req.params;    
        let operation =new TaskOperation();
        let taskList= await operation.getPaginationTaskList(page,2);
        res.status(200).json({
                success:true,
                task:taskList          
        });
    }catch(error){
            res.status(500).json({
                "success":false,
                "error":error
            })
    }    
})

// @route post api/task/
// @desc insert record to the database
router.post('/',async (req,res)=>{
    try {
        let operation =new TaskOperation();

        const {title,status}=req.body;
        let insertedTask= await operation.insertTask(title,status);
        res.status(200).json({
                success:true,
                task:insertedTask        
        });
    } catch (error) {
        res.status(500).json({
            "success":false,
            "error":error
        })
    }
})


module.exports=router;