import User from "../models/User.model.js";
import jwt from 'jsonwebtoken';
import { renameSync, unlinkSync } from "fs";
import { request } from "http";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
}

export const signup = async (req, res ,next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }
        const user = await User.create({email, password});
        res.cookie('jwt', createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        return res.status(201).json({
            user:{
                email: user.email,
                id: user.id,
                profileSetup: user.profileSetup,
            },
        });
    } catch (error) {
        console.log({error});
        return res.status(500).send("Internal server error");
    }
}