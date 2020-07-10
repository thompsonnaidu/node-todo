const express=require("express");
const app=express();
const PORT= process.env.PORT || 3000;
const connectDb=require('./config/db');

// create connection request globally
connectDb()

// initialize middleware
app.use(express.json({extended:false}))

// define routes
app.use('/api/task',require('./routes/task'));
app.use('/api/user',require('./routes/user'));

app.listen(PORT,(error)=>{
    if(error){
        throw new Error("There was an error while listening to port number ",PORT)
    }else{
        console.log("Application running on port number ",PORT)
    }
})     