import mongoose from "mongoose"

const questionSectionSchema = new mongoose.Schema(
  {
    poolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPool",
      required: true
    },
    title: {
      type: String, // Grammar, Writing, Reading...
      required: true
    },
    instruction: {
      type: String,
      required: true
    },
    order: {
      type: Number, // 1, 2, 3...
      required: true
    }
  },
  { timestamps: true }
)

const QuestionSection = mongoose.model(
  "QuestionSection",
  questionSectionSchema
)

export default QuestionSection
