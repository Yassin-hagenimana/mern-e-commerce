import mongoose from "mongoose"
import { registerSchema } from 'swaggiffy';
const userSchema=new mongoose.Schema(
    {
      name:{
          type:String,
          required:true,
        },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true,
      },
      isAdmin:{
        type:Boolean,
        default:false,
        required:true
      },
},
{
    timestamps:true
}
)
registerSchema('User', userSchema, {orm: 'mongoose'});
const User=mongoose.model("User",userSchema)
export default User;