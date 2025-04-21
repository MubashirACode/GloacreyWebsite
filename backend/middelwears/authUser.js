import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: 'Not Authorized: Invalid token' });
    }

    req.userId = decoded.id; // ✅ Set userId directly on req (not req.body)

    next(); // Continue to next middleware or controller
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
