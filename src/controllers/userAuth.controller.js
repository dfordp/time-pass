import express from 'express'; 
import bcrypt from "bcrypt"
import { getUserByEmail,createUser } from '../mongodb/models/user.js';
import { generateAuthToken } from '../helpers/index.js';

export const register = async(req,res) => {
    try{
        const {email ,password} = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const userExists = await getUserByEmail(email);

        if (userExists) {
            return res.status(409).send('Email already exists');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            email : email,
            password : encryptedPassword
        });

        const token = await generateAuthToken(newUser._id);
        console.log(token);
        return res.status(200).json({newUser , token}).end();

    }catch(e){
        console.log(e);
        res.status(500).send('Server error');
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return res.sendStatus(400);
        }
        
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const checkPassword =  await bcrypt.compare(password , user.password)

        if (checkPassword) {
            const token = await generateAuthToken(user._id);
            return res.status(200).json({user,token}).end();
        } else {
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}