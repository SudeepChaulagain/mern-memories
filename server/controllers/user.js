import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secret = "mernmemories"

export const signup =  async (req, res)=>{
    const {email, password, firstName, lastName} = req.body
    try {
        const exitsingUser = await User.findOne({email})
        if(exitsingUser) return res.status(400).json({message:"User already exists!"})
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`})
        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn:"1h"})
        res.status(201).json({result, token})

    } catch (error) {
        res.status(500).json({message: "Something went wrong. Please try again!"})
        console.log(error)
    }
}

export const signin = async (req, res)=>{
    const {email, password} = req.body
    try {
        const exitsingUser = await User.findOne({email})
        if(!exitsingUser) return res.status(400).json({message: "User doesn't exist!"}) 
        const isPasswordCorrect = await bcrypt.compare(password, exitsingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials!"})

        const token = jwt.sign({email: exitsingUser.email, id: exitsingUser._id}, secret, {expiresIn: "1h"})
        res.status(200).json({result: exitsingUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong. Please try again!"})
        console.log(error)
    }
}