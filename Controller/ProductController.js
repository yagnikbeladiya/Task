import Product from "../Models/Product.js";

export const addProduct=async(req,res)=>{
    try{
        const {id}=req.params;
        let product;

        if(id){
            product=await Product.findByIdAndUpdate(id,req.body,{new:true});

        }else{
            product=await Product.create(req.body);

        }
        res.json({success:true,product});
    }catch(err){
      res.status(500).json({success:false,error:err.message});

    
    }
};

export const createproduct=async(req,res)=>{
    try{
        const {
        name,
        handle,
        category,
        brand,
        review,
        variants
    }=req.body;

    if(!name||!handle){
        return res.status(400).json({
            success:false,
            message:"name and handle are required"
        });
    }

    const existing=await Product.findOne({handle});
    if(existing){
        return res.status(400).json({
            success:false,
            message:"handle must be unique"
        })
    }

    const product=new Product({
        name,
        handle,
        category,
        brand,
        review,
        variants

    });
    
    const savedProduct=await product.save();

    res.status(201).json({success:true,message:"product add ",product:savedProduct});

}catch(error){
    console.error("error create",error);
    res.status(500).json({
        success:false,
        message:"server error"
    });
}
};

export const searchProducts=async(req,res)=>{
    try{
         const{
            handle,
            category,
            brand,
            ratingMin,
            ratingMax,
            minPrice,
            maxPrice,
            optionValue,
            optionMode="or",
            page=1,
            limit=10,

         }=req.query;


         const filter={};

         if(handle){
            filter.handle={$regex:handle,$options:'i'};

         }
         if(category){
            filter["category.name"]={$regex:category,$options:'i'};

         }
         if(brand){
            filter["brand.name"]={$regex:brand,$options:'i'};


         }

         if( ratingMin || ratingMax){
            filter["review.rating"]={};
            if(ratingMin) filter["review.rating"].$gte=Number(ratingMin);
            if(ratingMax) filter["review.rating"].$lte=Number(ratingMax);

         }

         if( minPrice || maxPrice){
            filter["variants.price"]={};
            if(minPrice) filter["variants.price"].$gte=Number(minPrice);
            if(maxPrice) filter["variants.price"].$lte=Number(maxPrice);
            
         }

       if(optionValue){
             const values=optionValue.split(",");
             filter["variants.options.value"]=
             optionMode==="and" ? {$all:values}:{$in:values};

       }

       const products=await Product.find(filter)
       .skip((page-1)* limit)
       .limit(Number(limit));

       const count=await Product.countDocuments(filter);

       res.json({
        success:true,
        page:Number(page),
        totalPages:Math.ceil(count/limit),
        totalResults:count,
        products,
       });


    }catch(err){
            res.status(500).json({success:false,error:err.message});
    }
};