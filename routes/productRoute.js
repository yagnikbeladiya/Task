import express from "express";
import {addProduct,searchProducts,createproduct} from "../Controller/ProductController.js";

const router=express.Router();

router.put("/:id?",addProduct);
router.post("/",createproduct);

router.get("/search",searchProducts);

export default router;

