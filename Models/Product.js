import mongoose from 'mongoose';

const ProductVariantOptionSchema=new mongoose.Schema({
     name:{type:String,required:true},
     value:{type:String,required:true}


});


const ProductVariantSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    options:[ProductVariantOptionSchema],
});


const ReviewSchema=new mongoose.Schema({
    rating:{type:Number,required:true,min:1,max:5},
    comment:{type:String}
});

const CategorySchema=new mongoose.Schema({
    name:{type:String,required:true}
});

const BrandSchema=new mongoose.Schema({
    name:{type:String,required:true}
});

const ProductSchema=new mongoose.Schema({
    name:{type:String,required:true},
    handle:{type:String,required:true},
    category:CategorySchema,
    brand:BrandSchema,
    reviews:ReviewSchema,
    variants:[ProductVariantSchema]

});

export default mongoose.model('Product',ProductSchema);

