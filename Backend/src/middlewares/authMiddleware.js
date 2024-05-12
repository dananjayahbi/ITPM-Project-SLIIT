const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }

            // Find user by ID from token
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(401).json({ success: false, message: 'User not found' });
            }

            // Set authenticated user in request object
            req.user = user;

            // Continue to next middleware
            next();
        });
    } catch (error) {
        // Handle other errors
        console.error("Auth middleware error:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

//Identify Admin 
const isAdmin = async (req, res, next) => {
    try {
        const { email } = req.user;
        const isAdminUser = await User.findOne({ email });
        if (!isAdminUser || isAdminUser.role !== "admin") {
            throw new Error('You are not an admin');
        } else {
            next();
        }
    } catch (error) {
        return res.status(403).json({ msg: error.message, success: false });
    }
};

module.exports = {authMiddleware, isAdmin};