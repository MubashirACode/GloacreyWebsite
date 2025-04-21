



import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

// Register User :/api/user/register
export const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check for missing fields
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing details" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({ name, email, password: hashedPassword });
  
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      // Send response
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  
    } catch (error) {
      console.error("Registration error:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


// Login User :/api/user/login


export const login = async (req, res) => {
    try {



        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: "Email and password are required" })

        const user = await User.findOne({ email });


        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' })
        }




        const isMatch = await bcrypt.compare(password, user.password)


        if (!isMatch)
            return res.json({ success: false, message: 'Invalid email or password' })



        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })


        res.cookie('token', token, {
            httpOnly: true, // Prevent JS to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === ' production' ? 'none' : 'strict',  // CSRF Protection

            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time

        })


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { email: user.email, name: user.name }
        });

    } catch (error) {
        console.log(error.message, "is")
        res.json({ success: false, message: error.message })
    }
}




// Check Auth : /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        const userId = req.userId; // ✅ From authUser middleware

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("isAuth error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Logout  User : /api/user/logout


export const logout = async (req, res) => {

    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}