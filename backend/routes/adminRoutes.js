import express from "express";
import adminModel from "../models/adminModel.js";
import adminCheckAuth from "./auth/adminCheckAuth.js";
import userModel from "../models/userModel.js";
import salesModel from "../models/salesModel.js";

const router = express.Router();

router.get('/', adminCheckAuth, async(req,res)=>{
    try {
        const admins= await adminModel.find()
        const otherAdmins = admins.filter((admin)=>{
            return admin.email !== req.admin.email
        })
        res.send({
            message: 'Fetched all admins successfully!',
            data: otherAdmins
    })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        })
    }
});

router.get('/myaccount', adminCheckAuth, async(req,res)=>{
    try {
        res.send({
            message: 'My account fetched successfully!',
            data: req.admin
        }) 
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        })
    }
});

router.get('/reports', adminCheckAuth, async(req, res)=>{
    try {
        const users = await userModel.find();
        const sales= await salesModel.find();
        const salesSum =sales.reduce((a,b)=> a + b.sellingPrice, 0) 
        const buyingPriceSum = sales.reduce((a,b)=> a+ b.buyingPrice, 0)
        const profit = salesSum - buyingPriceSum
        res.send({
            message: 'Reports fetched successfully!',
            users: users.length,
            sales: sales.length,
            salesSum: salesSum,
            profit : profit
        })
    } catch (error) {
        res.send({
            message: error.message
         });
    }
});

router.get('/:id', adminCheckAuth, async(req,res)=>{
    try {
        const admin = await adminModel.findOne({_id:req.params.id})
        res.send({
            message: 'Admin fetched successfully!',
            data: admin
        });
    } catch (error) {
        res.send({
            message: error.message
         });
    }
});

router.post('/update/:id',adminCheckAuth, async(req, res)=>{ 
    try {
        const admin = await adminModel.findOne({_id : req.params.id})
        console.log(admin)
        admin.firstName = req.body.firstName;
        admin.lastName = req.body.lastName;
        admin.email = req.body.email;
        admin.phoneNumber = req.body.phoneNumber;
        const newAdmin = await admin.save();
        res.send({
            message: 'Admin updated successfully!',
            data: newAdmin
        })
    } catch (error) {
        console.log(error);
        res.send({
        message: error.message

     });
    }
});

router.post('/update',adminCheckAuth, async(req, res)=>{ 
    try {
        const myAccount = await adminModel.findOne({_id : req.admin.id})
        console.log(myAccount)
        myAccount.firstName = req.body.firstName;
        myAccount.lastName = req.body.lastName;
        myAccount.email = req.body.email;
        myAccount.phoneNumber = req.body.phoneNumber;
        const newMyAccount = await myAccount.save();
        res.send({
            message: 'My account updated successfully!',
            data: newMyAccount
        })
    } catch (error) {
        console.log(error);
        res.send({
        message: error.message

     });
    }
});

router.post('/delete/:id',adminCheckAuth, async(req,res)=>{
    try {
        await adminModel.deleteOne({_id:req.params.id})
        res.send({
            message: 'Admin deleted successfully!'
        })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        })
    }
});



export default router;