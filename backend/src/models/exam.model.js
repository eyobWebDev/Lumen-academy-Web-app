import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        subjectID: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
        pools: [
            {
                poolID: { 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "QuestionPool",
                },
                numberOfQuestions: {
                    type: Number,
                }
            },
        ],
        startTime: { 
            type: Date, 
            required: true
        },
        endTime: { 
            type: Date,
            required: true
        },
        durationMinutes: {
            type: Number,
            required: true
        },
        reviewTime: {
            type: Date,
            required: true 
        },
        isActive: {
            type: Boolean,
            default: false
        },
          status: {
            type: String,
            enum: ["scheduled", "live", "ended"],
            default: "scheduled"
        }
    }, { timestamps: true });

const Exam = mongoose.model("Exam", examSchema)

export default Exam