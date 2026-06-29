import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },

    lectureDuration: {
      type: Number, // minutes
      default: 0,
    },

    lectureUrl: {
      type: String,
      default: "",
    },

    isPreviewFree: {
      type: Boolean,
      default: false,
    },

    lectureOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const chapterSchema = new mongoose.Schema(
  {
    chapterTitle: {
      type: String,
      required: true,
    },

    chapterOrder: {
      type: Number,
      default: 0,
    },

    chapterContent: [lectureSchema],
  },
  { _id: true }
);

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    courseDescription: {
      type: String,
      required: true,
    },

    courseThumbnail: {
      type: String, // Cloudinary URL
      required: true,
    },

    coursePrice: {
      type: Number,
      required: true,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    educator: {
      type: String, // Clerk User ID
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    language: {
      type: String,
      default: "English",
    },

    courseContent: [chapterSchema],

    totalDuration: {
      type: Number,
      default: 0,
    },

    enrolledStudents: [
      {
        type: String, // Clerk User IDs
      },
    ],

    ratings: [
      {
        userId: String,
        rating: Number,
        review: String,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course =
  mongoose.models.Course ||
  mongoose.model("Course", courseSchema);

export default Course;