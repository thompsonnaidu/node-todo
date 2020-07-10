const connectDb=require('./../config/db');

class TaskOperation{

    constructor(){
        this.TaskModel = require("./../model/Task");
    }

    // get task
    async getPaginationTaskList(current_page,limit=10){

        try{            
            let skip_count=(current_page - 1 )*limit ;
            const taskList= await this.TaskModel.find().skip(skip_count).limit(limit);
            return taskList;
        }catch(error){
            console.log("There was an error while fetching task ",error);
            throw new Error("Error while fetching data");
        }
    }
    
    // add task
    async insertTask(title,status){
        try{
            const taskDB= await  new this.TaskModel({
                title:title,
                status:status
            });

           return await taskDB.save();
        }catch(error){
            console.log("There was an error while inserting the data ",error);
            throw new Error("Error while inserting the data");
        }
    }

    // edit task
    async updateTask(task){
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
    async removeTask(id){
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