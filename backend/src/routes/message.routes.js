import express from "express";
import multer from "multer";
import { checkAuth } from "../middleware/auth.middleware.js";
import { contactsforSidebar, getMessages,sendMessage } from "../controllers/message.controllers.js";

const upload = multer({ storage: multer.memoryStorage() });

const route = express.Router();
route.get("/users",checkAuth,contactsforSidebar)
route.get("/getmessages/:_id",checkAuth,getMessages)
route.post("/sendmessage/:_id",checkAuth,upload.single("image"),sendMessage)
export default route;