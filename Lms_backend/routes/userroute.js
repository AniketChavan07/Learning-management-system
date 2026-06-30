import express from "express";
import { getuserdata, userenrolledcourse } from "../Controllers/Usercontroller.js";

const userroute = express.Router()

userroute.get("/users",getuserdata)
userroute.get("/user-enrolled-course",userenrolledcourse)

export default userroute;