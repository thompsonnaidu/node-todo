const UserModel=require('../model/Users');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
class UserOperation{

    constructor(){

    }

    // register the user 
    async registerUser(user){
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
                    // const salt=await bcrypt.genSalt(10);
                    // newUser.password=await bcrypt.hash(user.password,salt)
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
                        return {isVerified:false,error:"invalid credentials"};
                   }else{
                       return {isVerified:true,data:user};
                   }
            } catch (error) {
                throw new Error("Username or password invalid")
            }
    }
    



}

module.exports=UserOperation;