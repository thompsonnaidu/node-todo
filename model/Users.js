const mongoose=require('mongoose');
// define the collection struc
const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
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
module.exports=mongoose.model("user",UserSchema)