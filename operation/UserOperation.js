const UserModel=require('../model/Users');
const connectDb=require('../config/db');

class UserOperation{

    constructor(){

    }

    // register the user 
    async registerUser(user){
        user={name:"thompson",email:"thompson@gmail.com",password:"password"}
            // if the user exists thorw error
            // register the user
            try {
                let anyUser= await UserModel.findOne({email:user.email});
                if(anyUser){
                    //email already resgister
                    console.log(anyUser);
                    throw new Error("THe mention email is already registered") 
                }else{
                    let newUser= new UserModel({
                        email:user.email,
                        password:user.password,
                        name:user.name
                    });

                    await newUser.save();
                    return {name:user.name,email:user.email};
                }
            } catch (error) {
               console.log(error);
               throw new Error(error);
            }
    }

    // login user
    async checkLogin(email,password){
            // check fetch user with email and password
            // return success(200)else return error (401);
            try {
                   let user= await UserModel.findOne({email:email, password:password});
                   if(!user){
                        throw new Error("Username or password invalid")
                   }else{
                       return user;
                   }
            } catch (error) {
                throw new Error("Username or password invalid")
            }
    }




}


// (async ()=>{
//     let Operation=new UserOperation();
//     let data= await Operation.checkLogin("thompson@gmail.com","password")
//     console.log(data)
// })();
(async ()=>{
    await connectDb();
    let Operation=new UserOperation();
    // let data= await Operation.registerUser({});
    let data= await Operation.checkLogin("thompson@gmail.com","password")
    console.log(data)
})()
module.exports=UserOperation;