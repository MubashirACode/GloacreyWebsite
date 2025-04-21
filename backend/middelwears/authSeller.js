import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies; // ✅ Get sellerToken from cookies

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized: No token provided" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      req.sellerId = tokenDecode.id; // ✅ Store seller ID on `req` (not `req.body`)
      next(); // ✅ Proceed to next middleware
    } else {
      return res.status(403).json({ success: false, message: "Not Authorized: Invalid seller" });
    }

  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
