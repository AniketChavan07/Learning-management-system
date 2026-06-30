import Course from "../models/course.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
export const getuserdata = async (req,res)=>{
    try {
    const { userId } = await req.auth();
        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json({message:"user are found sucessfully",user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
// users enrolled course with lecture links
export const userenrolledcourse = async (req,res)=>{
    try {
    const { userId } = await req.auth();

    const purchase = await Purchase.findById(userId).populate('enrolledCourses')
     
   res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};