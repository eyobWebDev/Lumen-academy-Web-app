import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        poolID: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionPool",
            required: true
        },
        sectionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionSection"
        },
        number: {
            type: Number, // 1–50
            required: true
        },
        text: { 
            type: String, 
            required: true
        },
        options: [
            { label: String, text: String }
        ],
        correctOption: {
            type: String
        },
        explanation: {
            type: String,
            default: ""
        },
        instruction: {

        }
    }, { timestamps: true });

const Question = mongoose.model("Question", questionSchema)

export default Question