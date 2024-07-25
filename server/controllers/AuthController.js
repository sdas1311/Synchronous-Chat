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
            console.log("User already exists");
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
        const user = await User.login(email, password);
        if(user){
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
        }
        return res.status(400).send("Invalid Credentials");
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal Sever Error");
    }
}