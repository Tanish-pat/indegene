import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("Unauthorized: No token provided");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            console.log("Invalid Token");
            return res.status(401).json({ message: "Invalid Token" });
        }

        const user = await User.findById(decode.userId);
        if (!user) {
            // console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        req.id = req.user._id;
        next();
    } catch (error) {
        console.log("Authorization error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const isUser = (req, res, next) => {
    try {
        if (req.user && req.user.role === "user") {
            next();
        } else {
            console.log("Unauthorized User");
            return res.status(403).json({ message: "Access denied: User role required" });
        }
    } catch (error) {
        console.log("Authorization error:", error);
        return res.status(401).json({ message: "Unauthorized User" });
    }
}

const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            console.log("Unauthorized Admin");
            return res.status(403).json({ message: "Access denied: Admins only" });
        }
    } catch (error) {
        console.log("Authorization error:", error);
        return res.status(401).json({ message: "Unauthorized Admin" });
    }
};

const isClerk = (req, res, next) => {
    try {
        if (req.user && req.user.role === "clerk") {
            next();
        } else {
            console.log("Unauthorized clerk");
            return res.status(403).json({ message: "Access denied: clerk role required" });
        }
    } catch (error) {
        console.log("Authorization error:", error);
        return res.status(401).json({ message: "Unauthorized clerk" });
    }
};

export { isAuthenticated, isUser, isAdmin, isClerk };