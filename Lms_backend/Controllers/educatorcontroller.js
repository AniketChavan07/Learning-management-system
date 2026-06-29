import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import connectcloudinary from "../config/cloudinary.js";
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