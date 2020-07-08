const mongoose= require('mongoose');
const dbURL="mongodb://localhost:27017/test?retryWrites=true&w=majority";

const connectDb=async ()=>{
    try {
   
        await mongoose.connect(dbURL,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log("mongodb connected");
    } catch (error) {
        console.log("there was an error connecting to db")
        process.exit(1);
    }
    
}

module.exports=connectDb;