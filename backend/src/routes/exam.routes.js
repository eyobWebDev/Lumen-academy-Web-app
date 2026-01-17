import express from "express"
import { createExam, getExam, getExamSchedule, getLiveExamQuestions } from "../controllers/exam.controller.js"

const router = express.Router()

router.post("/get", getExam)
router.post("/new", createExam)
router.get("/all", getExamSchedule)
router.get("/:examID", getLiveExamQuestions)




export default router