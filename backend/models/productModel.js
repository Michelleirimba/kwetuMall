import {model, Schema} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
       type: String,
       required: true
    }, 
    images: [String],
    price: {
        type: Number,
        required: true
    },
    buyingPrice: {
        type: Number
    },
    stock: {
        type: Number,
        required: true
    },
    category: [String],
    description:{
        type: String,
        required: true
    }
});

export default model ("productModel",productSchema) 