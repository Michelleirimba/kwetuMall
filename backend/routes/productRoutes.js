import express from "express";
import productModel from '../models/productModel.js';
import multer from 'multer';
import fs from 'fs';

const router= express.Router();

const upload= multer({dest: 'uploads'})
const uploadProductImages= upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'images', maxCount:4}
]);

router.get('/', async (req,res)=>{
    try{
       const products= await productModel.find();
       res.send({
        message: 'Fetched products successfully!',
        data: products
       })
    }catch(error){
        console.log(error)
        res.send({
            message: error.message
        });
    }
})

router.post('/create',uploadProductImages,async (req, res)=>{
    try{
    console.log(req.files)
    let singleImage= req.files.image[0]
    let extension= (singleImage.mimetype).split('/')[1]
    let singleImageFileName= singleImage.filename + '.' + extension
    fs.rename(`./uploads/${singleImage.filename}`, `./uploads/${singleImageFileName}`,
    ()=> console.log('Renamed image Successfully'))

    let images= req.files.images
    let renamedImages= images.map((img)=>{
        let imgExtension = img.mimetype.split('/')[1]
        let imgNewFileName= img.filename + '.' + imgExtension
        fs.rename(`./uploads/${img.filename}`, `./uploads/${imgNewFileName}`,
        ()=> console.log('Renamed image Successfully'))
        return imgNewFileName
    })
    console.log(renamedImages)

    const product= new productModel({
        name: req.body.name,
        image:  singleImageFileName,
        images: renamedImages,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        description: req.body.description
    })
    const data= await product.save()

    res.send({    
        message: 'Product created successfully!',
        data: data
       })
    }catch(error){
        console.log(error);
        res.send({
            message: error.message
        });
    }
} )

router.get('/:id', async (req, res)=>{
    try{
      const id= req.params.id;
      const product= await productModel.findOne({_id:id});
       res.send({
        message: 'Fetched product successfully!',
        data: product
       })
    }catch(error){
        console.log(error);
        res.send({
            message: error.message
        });
    }
});
router.post('/delete/:id', async(req, res)=>{
    try{
     const product= await productModel.findOne({_id:req.params.id})
     fs.unlink('./uploads/'+product.image, function (err) {
        if (err){
            console.log(err)
        }
        console.log('File deleted!')
     });
     product.images.map((img)=>{
        fs.unlink('./uploads/'+img, function(err) {
            if (err){
                console.log(err)
            }
            console.log('File deleted!')
        })
     });
     await productModel.deleteOne({_id:req.params.id})
     res.send({
        message: 'Deleted product successfully!'
    })
    }catch(error){
        console.log(error);
        res.send({
            message: error.message
        });
    }
})

export default router
