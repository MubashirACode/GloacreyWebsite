import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import 'dotenv/config';
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectClodinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripwebhooks } from "./controllers/orderController.js";
const app = express();
const port = process.env.PORT || 4000;



await connectDB();
await connectClodinary

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173" ,"https://gloacrey-website-dp4v.vercel.app"];
app.post('/stripe', express.raw({ type: 'application/json' }), stripwebhooks);

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Default route
app.get("/", (req, res) => {
    res.send("API is Working");
});
app.use('/api/user', userRouter);
app.use('/api/seller/', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter)
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
