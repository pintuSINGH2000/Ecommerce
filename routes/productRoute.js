import  express  from "express";
import formidable from  'express-formidable';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

//routes
router.post('/create-product',requireSignin,isAdmin,formidable(),createProductController);

//update product
router.put('/update-product/:pid',requireSignin,isAdmin,formidable(),updateProductController);

//get all product
router.get('/get-product',getProductController);

//get single produvt
router.get('/get-product/:slug',getSingleProductController);

//get photo
router.get('/product-photo/:pid',productPhotoController);

//delete product
router.delete('/delete-product/:pid',deleteProductController);

export default router;