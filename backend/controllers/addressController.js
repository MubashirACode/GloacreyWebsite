// Import model
import Address from "../models/Addres.js";

// Add Address: POST /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body;

        if (!address || !userId) {
            return res.status(400).json({ success: false, message: "Address and userId are required." });
        }

        // Add userId to address object explicitly
        const newAddress = new Address({ ...address, userId });
        await newAddress.save();

        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log("Add Address Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Address: POST /api/address/get
export const getAddress = async (req, res) => {
    try {
      const { userId } = req.query; // ✅ Use query for GET requests
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId" });
      }
  
      const addresses = await Address.find({ userId });
  
      res.json({ success: true, addresses });
    } catch (error) {
      console.log("Get Address Error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  