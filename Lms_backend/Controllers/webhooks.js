import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEB_HOOK);

    const payload = webhook.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );

    const { data, type } = payload;

    switch (type) {
      case "user.created": {
        const userdata = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imgurl: data.image_url,
        };

        await User.create(userdata);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userdata = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imgurl: data.image_url,
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