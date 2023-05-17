import express from "express";
import pickupPointModel from "../models/pickupPointModel.js";

const router = express.Router();

router.get('/',  async(req, res)=>{
    try{
        const pickupPoints=  await pickupPointModel.find();
        res.send({
            message: 'Fetched pickupPoints successfully!',
            data: pickupPoints
        });
    }catch(error){
     console.log(error);
     res.send({
        message: error.message
     });
    } 
});

router.post('/create', async(req, res)=>{
    
    try {
        const newpickupPoints = new pickupPointModel({
            location: req.body.location,
            name: req.body.name
        })
        const pickupPoint = await newpickupPoints.save();
        res.send({
            message: 'Created pickupPoint successfully!',
            data: pickupPoint
        })
    }catch(error){
        console.log(error);
        res.send({
           message: error.message
        });
    }
});

router.get('/:id',async (req, res)=>{
    try{
        const id =req.params.id;
        const pickupPoint= await pickupPointModel.findOne({_id:id});
         res.send({
            message: 'Fetched pickupPoint successfully!',
            data: pickupPoint
         })
    }catch(error){
        console.log(error);
        res.send({
           message: error.message
        });
    }
});

router.post('/update/:id', async (req, res)=>{
    try{
        const id= req.params.id
        const pickupPoint= await pickupPointModel.findOne({_id:id})
        pickupPoint.location= req.body.location
        pickupPoint.name= req.body.name
        const result= await pickupPoint.save();
        res.send({
            message: "Updated pickupPoint succesfully!",
            data: result
        });
    }catch(error){
        console.log(error);
        res.send({
           message: error.message
        }); 
    }
});

router.post('/delete/:id', async(req, res)=>{
    try{
      await pickupPointModel.deleteOne({_id:req.params.id})
      res.send({
        message: "pickupPoint deleted successfully!"
      })
    }catch(error){
        console.log(error);
        res.send({
           message: error.message
        });   
    }
})


export default router;