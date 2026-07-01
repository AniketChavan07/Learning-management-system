import express from "express";
import { getuserdata, purchasecourse, userenrolledcourse ,getusercourseprogress,courseprogress,addUserRating}
 from "../Controllers/Usercontroller.js";

const userroute = express.Router()

userroute.get("/users",getuserdata)
userroute.get("/user-enrolled-course",userenrolledcourse)
userroute.post("/purchase-course",purchasecourse)
userroute.post("/user-course-progress",getusercourseprogress  )
userroute.post("/course-progress",courseprogress  )
userroute.post("/add-user-rating",addUserRating  )


export default userroute;