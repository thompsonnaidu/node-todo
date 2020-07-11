const mongoose=require('mongoose');
// define the collection struc
const TaskSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['inprogress','complete','not_started'],
        default:'not_started'
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    lastUpdatedDate:{
        type:Date,
        default:Date.now
    }
});
// creating the collection
module.exports=mongoose.model("tasks",TaskSchema)