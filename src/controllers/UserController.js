import { User } from "../models/userShema";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export default class UserController{
    static async loginUser(req,res){
        const {email,password}  = req.body;
        try {
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({message:"User Not Found"});

            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid password"});
            }
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            return res.status(200).json({token});

        } catch(error){
            console.error("Error ao fazer login:",error);
            return res.status(500).json({message:"Internal server error"});
        }
    }
}