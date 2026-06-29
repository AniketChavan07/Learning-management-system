import express from "express";
import { addCourse, updateeducatorrole } from "../Controllers/educatorcontroller.js";
import protectedEducator from "../middlewares/authmiddleware.js";
import upload from "../config/multer.js";

const educatorRoute = express.Router();

educatorRoute.get("/update-role", updateeducatorrole);

educatorRoute.post("/add-course",upload.single('image'),protectedEducator,addCourse);

export default educatorRoute;