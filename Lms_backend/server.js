import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import educatorRoute from "./routes/educatorroute.js";
import { clerkhooks } from "./Controllers/webhooks.js";
import connectcloudinary from "./config/cloudinary.js";

const app = express();

await connectdb();
await connectcloudinary();
app.use(cors());

app.use(clerkMiddleware());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/educator", educatorRoute);

app.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  clerkhooks
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});