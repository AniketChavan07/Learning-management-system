import express from "express";
import protectedEducator from "../middlewares/authmiddleware.js";
import { getcourse, getcourseid } from "../Controllers/Coursecontroller.js";


const courseRoute = express.Router();

courseRoute.get("/get-course",protectedEducator,getcourse)
courseRoute.get("/get-courseid",protectedEducator,getcourseid)

export default courseRoute


