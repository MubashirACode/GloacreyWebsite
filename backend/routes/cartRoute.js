import express from "express";
import authUser from "../middelwears/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
