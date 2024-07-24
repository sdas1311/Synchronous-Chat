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
<<<<<<< HEAD
};

export const login = async (req, res ,next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }
        const userData = await User.findOne({email});
        if (!userData) {
            return res.status(404).send("User not found");
        }
        const auth = await compare(password,userData.password);
        if (!auth) {
            return res.status(400).send("Invalid credentials");
        }
        res.cookie('jwt', createToken(email, userData.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        return res.status(200).json({
            userData:{
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
            },
        });
    } catch (error) {
        console.log({error});
        return res.status(500).send("Internal server error");
    }
};

export const getUserInfo = async (req, res ,next) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
        console.log({error});
        return res.status(500).send("Internal server error");
    }
}

export const updateProfile = async (req, res ,next) => {
    try {
        const {userId} = req;
        const {firstName, lastName, color} = req.body;
        if (!firstName || !lastName ) {
            return res
            .status(400)
            .send("First name, last name and color are required");
        }
        const userData = await User.findByIdAndUpdate(
            userId, 
        {
            firstName,
            lastName,
            color,
            profileSetup: true,
        }, {new: true, runValidators: true});
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
        console.log({error});
        return res.status(500).send("Internal server error");
    }
}

export const addProfileImage = async (req, res ,next) => {
    try {
        if(!req.file) {
            return res.status(400).send("Image is required");
        }
        const date = Date.now();
        const fileName = `uploads/profiles/${date}-${req.file.originalname}`;
        renameSync(req.file.path, fileName);
        const updatedUser = await User.findByIdAndUpdate(
            req.userId, 
            {image: fileName}, 
            {new: true, runValidators: true});
        return res.status(200).json({
            image: updatedUser.image,
        });
    } catch (error) {
        console.log({error});
        return res.status(500).send("Internal server error");
    }
}

export const removeProfileImage = async (req, res ,next) => {
    try {
        const {userId} = req;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (!user.image) {
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return res.status(200).send("Image removed successfully");
    } catch (error) {
        console.log({error});
        return res.status(500).send("Internal server error");
    }
=======
>>>>>>> parent of 20e151e (" day 3,4")
}