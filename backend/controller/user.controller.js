import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import  generateToken  from "../config/generateToken.js";

const registerUser = async (req, res) => {
    const { username, name, email, password } = req.body;

    if(!username || !name || !email || !password){
        return res.status(400).json({message:'All fields are required'});
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, name, email, password });

    const createUser = await User.findById(user._id).select('-password');

    if(!createUser){
        return res.status(500).json({message:'User not created'});
    }

    const options ={
        secure: true,
        maxAge: 7*24*60*60*1000,
    }

    const token = generateToken(user);

    return res.status(200).cookie('token',token,options).json({
        message: 'User registered successfully',
        createUser,
        token
    });
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:'All fields are required'});
    }

    const existedUser = await User.findOne({email});
    if(!existedUser){
        return res.status(400).json({message:'User not found'});
    }

    const isPasswordValid = await existedUser.matchPassword(password);
    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid credentials'});
    }

    const token = generateToken(existedUser);

    const options ={
        secure: true,
        maxAge: 7*24*60*60*1000,
    }

    return res.status(200).cookie('token',token,options).json({
        message: 'User logged in successfully',
        existedUser, token});
}

const logoutUser = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie('token', null, options).json({})
}

export { registerUser, loginUser, logoutUser };