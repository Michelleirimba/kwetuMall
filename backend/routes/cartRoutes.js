import express from 'express';
import userModel from '../models/userModel.js';
import CheckAuth from './auth/Checkauth.js';
import productModel from '../models/productModel.js';
import salesModel from '../models/salesModel.js';

const router =express.Router(); 

router.post('/add/:id', CheckAuth, async(req, res)=>{
       let productId = req.params.id;
       const user = await userModel.findOne({_id:req.user._id})
       let cart = user.cart;
       let inCart = false;
       for(let i = 0; i< cart.length; i++){
        if(productId === cart[i].productId){
            inCart = true;
        } 
       }
       if(inCart === true){
        res.send({
            message: 'Product already in cart'
        })
       }else if( inCart === false){
        user.cart = [...user.cart, {productId: productId, number: req.body.number}]
        let result = await user.save();
        res.send({  
            message: 'Product added successfully!',
            data: result
        })
       }
});

router.get('/get',CheckAuth, async(req, res)=>{
    let cart = req.user.cart;
    let products =[]
    for(let i=0; i< cart.length; i++){
        let product = await productModel.findOne({_id: cart[i].productId});
        products = [...products, {product:product, number:cart[i].number}]
    }
    res.send({
        message: 'Cart fetched successfully!',
        data: products
    })
});

router.post('/delete/:id',CheckAuth, async(req, res)=>{
    let productId = req.params.id
    const user = await userModel.findOne({_id:req.user._id}) 
    // user.cart= []
    // await user.save()
    // res.send('success')
    const cart= user.cart
    let newCart= []
    for(let i=0; i< cart.length; i ++){
        if(cart[i].productId !== productId){
            newCart = [...newCart, cart[i]]
        }   
    }
    user.cart = newCart;
    await user.save();
    res.send({
        message: 'Cart deleted successfully!',
        data: newCart
    })

});

router.get('/items/count',CheckAuth, (req,res)=>{
    const cart = req.user.cart;
    res.send({
        message: 'Found total items in cart',
        number: cart.length
    })
});

router.post('/clear', CheckAuth, async(req,res)=>{
    try {
        let cart = req.body;
        const user = await userModel.findOne({_id:req.user._id});
        for(let i=0; i<cart.length; i++){
            const product = await productModel.findOne({_id : cart[i].product._id});
            product.stock = product.stock - cart[i].number;
            await product.save();
            const newSale = new salesModel({
               productId : product._id,
               userId : user._id,
               buyingPrice : product.buyingPrice * cart[i].number,
               sellingPrice: product.price * cart[i].number
            }) 
          await newSale.save();
        }
        
        user.cart = [];
        const result = await user.save(); 
        res.send({
            message: 'Checked out successfully!',
            data: result
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
});

export default router;