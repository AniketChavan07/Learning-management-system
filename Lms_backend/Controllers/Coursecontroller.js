import Course from "../models/course.js";

// get all courses
export const getcourse = async (req, res) => {
  try {
    const course = await Course.find({ isPublished: true })
      .select(["-courseContent", "enrolledStudents"])
      .populate({ path: "educator" });

    return res.status(200).json({ message: "Course fetch" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

// get a particular course with id

export const getcourseid = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate({ path: "educator" });

    // remove a lecture url if previewfree is false

    Course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.previewfree) {
          lecture.lectureUrl = "";
        }
      });
    });
    return res.status(200).json({message:`course fetch successfully ${id}`})
  } catch (error) {

    return res.status(500).json({message:error.message})
  }
};
