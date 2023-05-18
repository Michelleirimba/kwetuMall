import express from 'express';
import bodyParser from 'body-parser';
import classRoutes from './routes/classRoutes.js';
import exampleRoutes from './routes/exampleRoutes.js';
import mongoose from 'mongoose';
import categoryRoutes from './routes/categoryRoutes.js';
import pickupPointRoutes from './routes/pickupPointRoutes.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userAuth from './routes/auth/userAuth.js';
import adminAuth from './routes/auth/adminAuth.js';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')) ;

const mongoURI ='mongodb+srv://Michelleirimba:' + encodeURIComponent ('Kim@thib2') + '@cluster0.hu4yuos.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI)
        .then(()=>console.log('Connected to mongo db'))
        .catch((err)=> console.log(err))

app.use('/class', classRoutes);
app.use('/',exampleRoutes);
app.use('/categories', categoryRoutes);
app.use('/pickupPoints', pickupPointRoutes);
app.use('/products', productRoutes);
app.use('/', userAuth);
app.use('/admin', adminAuth);


app.listen(PORT, ()=>{
    console.log("Server listening on PORT: "+PORT)
});