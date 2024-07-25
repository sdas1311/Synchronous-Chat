import { compare } from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const maxAge = 3 * 24 * 60 * 60 * 1000 ; // 3 days


const createToken = (email,userId) => {
    return jwt.sign({email,userId}, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
}


export const signup = async (req, res ,next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }

        const existingUser = await User.findOne({ email });  //existing User
        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        const user = await User.create({email, password}); //new User
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure:true,
            sameSite:"None",
        });
        return res.status(201).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color,
            },
        });
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Sever Error");
    }
}

export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).send("Invalid Credentials");
        }
        const auth = await compare(password, user.password);
        if(!auth){
            return res.status(400).send("Incorrect Password");
        }
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure:true,
            sameSite:"None",
        });
        return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
            },
        });
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Sever Error");
    }
}

export const getUserInfo = async (req, res, next) => {
    try{
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(404).send("User not found");
        }
        return res.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color,
        });
    } catch(error){
        console.log(error);
        return res.status(500).send("Internal Sever Error");
    }
}