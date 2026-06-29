import { clerkClient } from "@clerk/express";

// Middleware to protect educator routes
const protectedEducator = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Educator only.",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default protectedEducator;