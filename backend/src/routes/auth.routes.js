import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { signup, login, logout,updateProfile } from "../controllers/auth.controllers.js";
const route = express.Router();

route.post("/signup", signup);

route.post("/login", login);    

route.get("/logout", logout);

route.put("/update-profile",checkAuth,updateProfile)

export default route;
