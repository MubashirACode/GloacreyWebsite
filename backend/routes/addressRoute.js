import express from 'express'
import { addAddress, getAddress } from '../controllers/addressController.js';
import authUser from '../middelwears/authUser.js';


    const addressRouter = express.Router();


    addressRouter.post('/add' , authUser , addAddress);
    addressRouter.get('/get' , authUser , getAddress);



    export default addressRouter;