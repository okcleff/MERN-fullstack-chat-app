import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

const checkAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ result: false, message: 'Unauthorized - No Token Provided' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select('-password');

  if (!user) {
    return res.status(404).json({ result: false, message: 'User not found' });
  }

  req.user = user;

  next();
});

export default checkAuth;
