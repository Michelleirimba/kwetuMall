import {model, Schema} from 'mongoose';

const categorySchema= new Schema ({
    name: { type: String }
});

export default model ("categoryModel", categorySchema)