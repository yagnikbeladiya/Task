import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import mongoose from "mongoose";

dotenv.config();


const app=express();

app.use(express.json());


app.use("/api/products",productRoutes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true})
.then(()=>{
    app.listen(process.env.PORT,()=>console.log(`server start port number ${process.env.PORT}`));
    console.log("database connected");

})
.catch((err)=>console.error("database connection error",err));