import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminModel from '../../models/adminModel.js'

const router= express.Router();
const saltRound= 10

router.post('/register', (req, res)=>{
    try{
        if(!req.body || !req.body.password){
            res.send({
                message: 'Admin details not found'
            })
        }
        bcrypt.hash(req.body.password, saltRound, async(err, hash)=>{ 
          if(err){
            console.log(err)
          }
          const newAdmin =new adminModel({
            firstName: req.body.firstName ,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email, 
            password: hash
          });
          const admin= await newAdmin.save();
          const token= jwt.sign({adminId: admin._id}, 'MY_SECRET-KEY')
          res.send({
            message: 'Admin created successfully!',
            admin: admin,
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