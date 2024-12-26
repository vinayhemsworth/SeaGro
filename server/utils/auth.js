import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};