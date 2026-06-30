import express from "express";
import { getuserdata, purchasecourse, userenrolledcourse } from "../Controllers/Usercontroller.js";

const userroute = express.Router()

userroute.get("/users",getuserdata)
userroute.get("/user-enrolled-course",userenrolledcourse)
userroute.post("/purchase-course",purchasecourse)

export default userroute;