import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import connectcloudinary from "../config/cloudinary.js";
import Purchase from "../models/Purchase.js";

export const updateeducatorrole = async (req, res) => {
  try {
    const { userId } = await req.auth();

    console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({
      success: true,
      message: "You can publish a course now.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// add new courseimport Course from "../models/course.js";

export const addCourse = async (req, res) => {
    try {

        const { courseData } = req.body;
        const imageFile = req.file;

        const { educatorId } = await req.auth();

        if (!imageFile) {
            return res.json({
                success: false,
                message: "Thumbnail not attached"
            });
        }

        // Convert string to object
        const parsedCourseData = JSON.parse(courseData);

        // Add educator id
        parsedCourseData.educator = educatorId;

        // Upload image
        const imageUpload = await connectcloudinary.uploader.upload(imageFile.path);

        // Save Cloudinary URL
        parsedCourseData.courseThumbnail = imageUpload.secure_url;

        // Save in MongoDB
        const newCourse = await Course.create(parsedCourseData);

        res.json({
            success: true,
            message: "Course created successfully",
            course: newCourse
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// get educator course

export const getcourse = async (req ,res)=>{
  try {

        const { educatorId } = await req.auth();
    const course = await Course.find({educatorId});

    return res.status(200).json({message: "course fetch succesfully"})

  } catch (error) {
   return res.status(500).json ({message:"Internal server eror",error}) 
  }
}



// get educator dashboard data (total earning ,no of studenets ,no of courses)

export const dashboard = async (req,res) =>{
 
  try {
         const { educatorId } = await req.auth();
    const course = await Course.find({educatorId});
const totalcourses = course.length;

const courseid = course.map (course=>course._id);

//all  purchasing $in = where 

const purchase = await Purchase.find({
  courseId : {$in: courseid},
  status : completed
})

// total earning 
const totalEarnings = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0
);

// total students 
const uniqueStudents = new Set(
    purchases.map(purchase => purchase.userId.toString())
);

const totalStudents = uniqueStudents.size;

return res.status(200).json({message:"Dashboard data fetch sucessfully"})
 
  } catch (error) {
    return res.status (500).json({message:error.message})
  }

}

// get enrolled students data with purchase data
export const enrolledstudentdata = async(req,res)=>{
  try {
   const educatorId = req.user.id;

        // Find all courses created by this educator
        const courses = await Course.find({ educator: educatorId });

        // Extract course IDs
        const courseIds = courses.map(course => course._id);

        // Find purchases for these courses
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: "completed",
        })
        .populate("courseId", "title thumbnail price")
        .populate("userId", "name email image");

        res.status(200).json({
            success: true,
            students: purchases,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};