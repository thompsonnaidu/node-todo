const express=require("express");
const app=express();

const PORT= process.env.PORT || 3000;

app.listen(PORT,(error)=>{
    if(error){
        throw new Error("There was an error while listening to port number ",PORT)
    }else{
        console.log("Application running on port number ",PORT)
    }
})