import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

// Add Product :/api/product/add
export const addProduct = async (req, res) => {
  try {
    // Parse product data
    const productData = JSON.parse(req.body.productData);

    // Check for required fields (optional, improve based on schema)
    if (!productData.name || !productData.price || !productData.category) {
      return res.status(400).json({ success: false, message: 'Missing required product fields' });
    }

    // Upload images to Cloudinary
    const images = req.files;
    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    // Save product to database
    await Product.create({ ...productData, image: imagesUrl });

    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error('Add product error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};



// Get Product :/api/product/list

export const productList = async (req, res) => {


    try {



        const products = await Product.find({})
        res.json({ success: true, products })



    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }


}


// Get single Products :/api/product/id
export const productById = async (req, res) => {


    try {


        const { id } = req.body
        const product = await Product.findById(id)

        res.json({ success: true, product })




    } catch (error) {

        console.log(error.message)
        res.json({ success: false, message: error.message })

    }


}


// Change Product inStock :/api/product/stock


export const changeStock = async (req, res) => {

    try {



        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock })

        res.json({ success: true, message: "Stock Updated" })


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }



}