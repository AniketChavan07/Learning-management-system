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