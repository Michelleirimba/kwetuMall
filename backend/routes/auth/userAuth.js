import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';

const router= express.Router();
const saltRound= 10

router.post('/register', (req,res)=>{
    try
    {console.log(req.body)
    if(!req.body || !req.body.password){
        res.send({
            message: 'User details not found'
        })
    }  
    bcrypt.hash(req.body.password, saltRound, async(err, hash)=>{
        if(err){
        console.log(err);
        }
        const newUser=new userModel({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            password:hash
        });
        const user= await newUser.save();
        const token= jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
        res.send({
            message: 'User created successfully!',
            user: user,
            token: token
        })
    })
}catch(error){
    console.log(error);
     res.send({
        message: error.message
     });
}
})

export default router;