const connectDb=require('./../config/db');

class TaskOperation{

    constructor(){
        this.TaskModel = require("./../model/Task");
    }

    // get task
    async getPaginationTaskList(current_page,limit=10,current_user){

        try{            
            let skip_count=(current_page - 1 )*limit ;
            const taskList= await this.TaskModel.find({user:current_user}).skip(skip_count).limit(limit);
            return taskList;
        }catch(error){
            console.log("There was an error while fetching task ",error);
            throw new Error("Error while fetching data");
        }
    }
    
    // add task
    async insertTask(title,status,current_user){
        try{
            const taskDB= await  new this.TaskModel({
                title:title,
                status:status,
                user:current_user
            });

           return await taskDB.save();
        }catch(error){
            console.log("There was an error while inserting the data ",error);
            throw new Error("Error while inserting the data");
        }
    }

    // edit task
    async updateTask(task,current_user){
        /**
         * check if the task id exists
         * update the task
         * return the updated data
         */
        try {
            const taskDB= await this.TaskModel.findById(task.id);
            if(!taskDB){
                 console.log("Record not present");
                 return {"isUpdated":false,"error":"Record not present"}
            }
            const data=await this.TaskModel.findByIdAndUpdate(task.id,{$set:task},{ new:true});
             return {"isUpdated":true,"data":data};
 
          } catch (error) {
              console.log("error while Updating an document ",error);
              throw new Error("Error while updating the data")
          }
    }

    // delete task
    async removeTask(id,current_user){
        /***
         * check if the data exists using the id 
         * check if it belong to the same user who has request it
         * delete the data
         */
         try {
           const task= await this.TaskModel.findById(id);
           if(!task){
                console.log("Record not present");
                return {"isdeleted":false,"error":"Record not present"}
           }
           if(task.user.toString() !== current_user){
                // this task does not belong to the authenticated user 
                return {"isdeleted":false,"error":"You are not allowed to delete this task"}
           }
           const data=await this.TaskModel.findByIdAndRemove(id);
           console.log(data,id);
            return {"isdeleted":true,"id":id};

         } catch (error) {
             console.log("error while deleting an document ",error);
             throw new Error("Error while deleting the data")
         }
    }
}

module.exports=TaskOperation;