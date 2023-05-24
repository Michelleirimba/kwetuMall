import express from 'express';
import userModel from '../models/userModel.js';
import CheckAuth from './auth/Checkauth.js';
import productModel from '../models/productModel.js';

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

})

export default router;