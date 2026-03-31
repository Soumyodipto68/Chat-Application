import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { contactsforSidebar, getMessages,sendMessage } from "../controllers/message.controllers.js";

const route = express.Router();
route.get("/users",checkAuth,contactsforSidebar)
route.get("/getmessages/:id",checkAuth,getMessages)
route.post("/sendmessage/:id",checkAuth,sendMessage)
export default route;