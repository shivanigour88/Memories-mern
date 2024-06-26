import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from '../models/user.js';

//Route fro signin 
export const signin = async(req,res) => {
    const{email , password} = req.body;
    try{
        const existingUser = await User.findOne( {email});
        if(!existingUser)
            return res.status(404).json( {message :'User does not exits'});

        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);
        if(!isPasswordCorrect)
            return res.status(404).json( {message :'Invalid Credentials'});

        const token = jwt.sign({ email:existingUser.email , id:existingUser._id} , 'test', {expiresIn:"1h"});
        res.status(200).json( {result:existingUser , token});


    }
    catch(error)
    {
        res.status(500).json({message : "somethimg went wrong"});
    }

}

//Route fro signup
export const signup = async(req,res) => {
    const{email ,firstName , lastName ,confirmPassword , password} = req.body;

    try{
        const existingUser = await User.findOne( {email});
        if(existingUser)
            return res.status(400).json( {message :'User already exits'});
        if(password !== confirmPassword)
            return res.status(400).json( {message : "Password does not match"});

        //Hshinh the password
        const hashedPassword = await bcrypt.hash( password , 12);

        const result = await User.create({email , password:hashedPassword , name:`${firstName} ${lastName}`});
        const token = jwt.sign( {email:result.eamil ,id:result._id},'test', {expiresIn:"1h"} );
        res.status(200).json( {result , token});
    }
    catch(error)
    {
        res.status(500).json({message : "somethimg went wrong"});
    }
}