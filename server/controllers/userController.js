import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender, role } = req.body;
        if (!fullName || !username || !email || !password || !confirmPassword || !gender || !role) {
            console.log("All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            console.log("Password does not match");
            return res.status(400).json({ message: "Password does not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            console.log("Username already exists. Try another username");
            return res.status(400).json({ message: "Username already exists. Try another username" });
        }
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await User.create({
            fullName,
            username,
            email,
            password,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender,
            role
        })
        return res.status(201).json({
            userId: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePhoto: newUser.profilePhoto,
            gender: newUser.gender,
            role: newUser.role,
            conversationIds: newUser.conversationIds,
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            console.log("All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            console.log("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }
        const isPasswordCorrect = password === user.password;
        if (!isPasswordCorrect) {
            console.log("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }
        const tokenData = { userId: user._id, role: user.role };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                userId: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePhoto: user.profilePhoto,
                gender: user.gender,
                role: user.role,
                conversationIds: user.conversationIds,
             });

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const logout = async (req, res) => {
    try {
        if(!req.cookies.token){
            console.log("No LoggedIn User");
            return res.status(401).json({ message: "No LoggedIn User" });
        }
        // console.log("Logged Out Successfully");
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUser = req.id;
        console.log("loggedInUser", loggedInUser);
        const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}