import Question from "../models/question.model.js"
import QuestionSection from "../models/questionSection.model.js"
import csv from "csv-parser"
import { Readable } from "stream"

export const createQuestion = async (req, res) => {
    const {poolID, text, options, correctOption, explanation} = req.body

    try {
        const newQuestion = new Question({text, poolID, options, correctOption, explanation})
        newQuestion.save()
        if (newQuestion) {
            res.status(201).json(newQuestion)
        } else {
            res.status(400).json({message: "Invalid Data"})
        }
    } catch (e) {
        console.log("Error creating Question", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const fetchAllQuestion = async (req, res) => {
    try {
        const questionPools = await Question.find().sort({ name: 1 }).populate("poolID", "name totalQuestions").populate("sectionID", "title instruction order");
        res.status(200).json(questionPools)
    } catch (e) {
        console.log("Error fetching Question Pool", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Question.findByIdAndDelete(id);
    res.json({ message: "Question deleted successfully" });
  } catch (e) {
    console.log("Error deleting Question", e.message)
    res.status(500).json({ error: "Failed to delete subject" });
  }
};

export const uploadQuestion = async (req, res) => {
    const {poolID} = req.body
    console.log("pool id", poolID);
    
    const fileBuffer = req.file.buffer

    try {
    console.log("Uploading file....");
    
    const questions = []
    const stream = Readable.from(fileBuffer)
    const sectionMap = new Map()
    const rows = []

     stream
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row)
      })
      .on("end", async () => {
        try {
          for (const row of rows) {
            let sectionID
            const key = `${row.sectionTitle}-${row.instruction}`

            if (sectionMap.has(key)) {
              sectionID = sectionMap.get(key)
            } else {
              const section = await QuestionSection.create({
                poolID,
                title: row.sectionTitle,
                instruction: row.instruction,
                order: sectionMap.size + 1,
              })
              sectionID = section._id
              sectionMap.set(key, sectionID)
            }

            questions.push({
              poolID,
              sectionID,
              number: Number(row.number),
              text: row.text,
              options: [
                { label: "A", text: row.optionA },
                { label: "B", text: row.optionB },
                { label: "C", text: row.optionC },
                { label: "D", text: row.optionD },
              ],
              correctOption: row.correctOption,
              explanation: row.explanation || "",
            })
          }

          const result = await Question.insertMany(questions)
          res.status(200).json({ questions: result, count: result.length })
          console.log("Questions uploaded successfully")
        } catch (err) {
          console.log("Error saving questions", err)
          res.status(500).json({ message: err.message })
        }
      })
    } catch (e) {
        console.log("Error uploading Question", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}