import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import checkAuth from './Checkauth.js';

const router= express.Router();
const saltRound= 10

router.get('/check/if/logged/in',checkAuth, (req, res)=>{
    res.send({
        message: `Hello, ${req.user.firstName} ${req.user.lastName}`,
        data: req.user
    })
})

router.post('/register', (req,res)=>{
    try{
        console.log(req.body)
        if(!req.body || !req.body.password){
            res.send({
                message: 'User details not found'
            })
        }  
        bcrypt.hash(req.body.password, saltRound, async(err, hash)=>{
            if(err){
            console.log(err);
            }
            try {
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
            } catch (error) {
                console.log(error);
                res.send({
                    message: error.message
                });
            }
        })
    }catch(error){
        console.log(error);
        res.send({
            message: error.message
        });
    }
});

router.post('/login',async (req,res)=>{
    console.log(req.body)
    if(!req.body.email || !req.body.password){
        res.send({
            message:'Provide email and password!'
        })
    }
    const user= await userModel.findOne({email: req.body.email})
    if(!user){
        res.send({
            message: 'Wrong password or email!'
        })
    }else{
    bcrypt.compare(req.body.password, user.password, (err, response)=>{
        if(err){
            console.log(err)
        }
        if(response === false){
            res.send({
                message: 'Wrong password or email!'
            })
        }else if(response === true){
          const token= jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
            res.send({
                message: 'User successfully authenticated!',
                user: user,
                token: token
            })
        }
    })
  }
});



export default router;