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
});

router.post('/login',async (req,res)=>{
  console.log(req.body)
  if(!req.body.email || !req.body.password){
      res.send({
          message:'Provide email and password!'
      })
  }
  const admin= await adminModel.findOne({email: req.body.email})
  if(!admin){
      res.send({
          message: 'Wrong password or email!'
      })
  }else{
  bcrypt.compare(req.body.password, admin.password, (err, response)=>{
      if(err){
          console.log(err)
      }
      if(response === false){
          res.send({
              message: 'Wrong password or email!'
          })
      }else if(response === true){
        const token= jwt.sign({adminId:admin._id}, 'MY_SECRET_KEY')
          res.send({
              message: 'Admin successfully authenticated!', 
              admin: admin,
              token: token
          })
      }
  })
}
});
 
export default router;