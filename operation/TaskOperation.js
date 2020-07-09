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
    updateTask(task){
        /**
         * check if the task id exists
         * update the task
         * return the updated data
         */
    }

    // delete task
    removeTask(id){
        /***
         * check if the data exists using the id 
         * check if it belong to the same user who has request it
         * check if the user is user
         */
    }
}

module.exports=TaskOperation;