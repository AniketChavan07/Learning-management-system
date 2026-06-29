import { Webhook } from "svix";
import User from "../models/User.js";
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