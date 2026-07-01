import Course from "../models/course.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import Stripe from "stripe";

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

// purchase  course
 export const purchasecourse = async(req,res)=>{
    try{
      const{courseId} =  req.body
      const {origin} = req.headers
    const { userId } = await req.auth();
      const courseData = await Course.find(courseId);
      const user = await User.find(userId);
      if(!user || ! course){
        return res.status(402).json({message:"Data not found"})
      }
      const purchaseData ={
        courseid : courseData._id,
        userid,
        amount: (courseData.coursePrice - courseData.
          discount * courseData.coursePrice /100).toFixed(2),
        
      }
      const newpurchase = await Purchase.create(purchaseData)

      // payment gateway using a strip instance
     const newstripinstance = new Stripe (process.env.STRIPE_SECRET_KEY) 
     const currency = process.env.CURRENCY.tolowerCase()

     // payment line up 
     // Creating line items for Stripe
const line_items = [
  {
    price_data: {
      currency,
      product_data: {
        name: courseData.courseTitle,
      },
      unit_amount: Math.floor(newPurchase.amount) * 100,
    },
    quantity: 1,
  },
];
// Create Stripe Checkout Session
const session = await stripe.checkout.sessions.create({
  success_url: `${origin}/loading/my-enrollments`,
  cancel_url: `${origin}/`,
  line_items,
  mode: "payment",
  metadata: {
    purchaseId: newPurchase._id.toString(),
  },
});

return res.status(200).json({message:true,session_url:session.url}) 
 }

    catch(error){
        return res.status(500).json({message:error.message})
    }
 }


 // course progress
  export const courseprogress = async(req,res)=>{
    try {
      const { userId } = await req.auth();
      const { courseId, lectureId } = req.body;
      const progress = await CourseProgress.findOne({ userId, courseId });
      if(progress){
        if(progress.completedLectures.includes(lectureId)){
          return res.status(400).json({message:"Lecture already marked as completed"})
        }
        progress.completedLectures.push(lectureId);
        await progress.save();

      }
      else{
        await CourseProgress.create({
          userId,
          courseId,
          completedLectures:[lectureId],
        })
      }
        return res.status(200).json({message:"Lecture marked as completed"})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
  }
  // get user course progress
  export const getusercourseprogress = async(req,res)=>{
    try {
      const { userId } = await req.auth();
      const { courseId } = req.body;
      const progress = await CourseProgress.findOne({ userId, courseId }).populate('completedLectures');
      if(!progress){
        return res.status(404).json({message:"No progress found for this course"})
      }
      return res.status(200).json({message:"Course progress found", progress})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
  }

 // add user rating

export const addUserRating = async (req, res) => {
    try {

        const { userId } = await req.auth();
        const { courseId, rating } = req.body;

        // Validate input
        if (
            !userId ||
            !courseId ||
            !rating ||
            rating < 1 ||
            rating > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
            });
        }

        // Check course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Check if user has purchased the course
        const purchase = await Purchase.findOne({
            userId,
            courseId,
            status: "completed",
        });

        if (!purchase) {
            return res.status(403).json({
                success: false,
                message: "You have not enrolled in this course",
            });
        }

        // Check if user already rated
        const existingRating = course.courseRatings.find(
            (item) => item.userId.toString() === userId
        );

        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating;
        } else {
            // Add new rating
            course.courseRatings.push({
                userId,
                rating,
            });
        }

        // Calculate average rating
        const totalRating = course.courseRatings.reduce(
            (sum, item) => sum + item.rating,
            0
        );

        course.courseRating = Number(
            (totalRating / course.courseRatings.length).toFixed(1)
        );

        await course.save();

        res.status(200).json({
            success: true,
            message: "Rating submitted successfully",
            averageRating: course.courseRating,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};