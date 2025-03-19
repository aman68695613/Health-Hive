/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Ensure you have this in your .env
const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies?.auth_token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user info to req
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" },error);
    }
};

// Export middleware
export default authenticateUser;
