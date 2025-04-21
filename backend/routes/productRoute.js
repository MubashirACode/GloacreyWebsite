import express from "express";
import authSeller from "../middelwears/authSeller.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import { upload } from "../config/multer.js";

const productRouter = express.Router();

// Fix upload field name: 'images' should be a string, not a variable
productRouter.post('/add', authSeller, upload.array(['images']), addProduct);
productRouter.get('/list', productList);
productRouter.get('/id/:productId', productById); // Assuming product ID is in params
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
