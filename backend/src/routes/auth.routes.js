import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import multer from "multer";
import { signup, login, logout,updateProfile } from "../controllers/auth.controllers.js";

const route = express.Router();
const upload = multer({ dest: "uploads/" });

route.post("/signup", signup);

route.post("/login", login);    

route.get("/logout", logout);

route.put("/update-profile",checkAuth, upload.single("profilePicture"),updateProfile);

export default route;
