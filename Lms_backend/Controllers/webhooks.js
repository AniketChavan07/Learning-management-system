import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
export const clerkhooks = async (req, res) => {
  try {
    console.log("Webhook received");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    // console.log("Headers:", req.headers);


    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }
        const webhook = new Webhook(process.env.CLERK_WEB_HOOK);

    // const payload = webhook.verify(
    //   req.body.toString(),
    //   {
    //     "svix-id": req.headers["svix-id"],
    //     "svix-timestamp": req.headers["svix-timestamp"],
    //     "svix-signature": req.headers["svix-signature"],
    //   }
    // );
    const payload = req.body;
    console.log("Verified Successfully");

    const { data, type } = payload;

    switch (type) {
      case "user.created": {
        const userdata = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.create(userdata);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userdata = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userdata);
        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true });
      }

      default:
        return res.json({ success: true });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (err) {

        console.log(err.message);

        return res.status(400).send(`Webhook Error: ${err.message}`);

    }

    // Payment Successful
    if (event.type === "checkout.session.completed") {

        const session = event.data.object;

        try {

            // Get purchase id stored in metadata
            const purchaseId = session.metadata.purchaseId;

            // Find purchase
            const purchase = await Purchase.findById(purchaseId);

            if (!purchase) {
                return res.status(404).json({
                    success: false,
                    message: "Purchase not found"
                });
            }

            // Update purchase status
            purchase.status = "completed";

            await purchase.save();

            // Enroll user
            await User.findByIdAndUpdate(
                purchase.userId,
                {
                    $addToSet: {
                        enrolledCourses: purchase.courseId
                    }
                }
            );

            console.log("Payment Verified");

        } catch (error) {

            console.log(error);

        }

    }

    res.json({ received: true });
};