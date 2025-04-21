

// Update  User CartData : /api/cart/update

import User from "../models/User.js";


export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        if (!userId || !cartItems) {
            return res.status(400).json({ success: false, message: "Missing userId or cartItems" });
        }
        const user = await User.findByIdAndUpdate(userId, { cartItems })

        res.json({ success: true, message: "Cart Updated", cartItems: user.cartItems });

    } catch (error) {

        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


