import express from "express"
import { createExam, getExam, getExamSchedule, getLiveExamQuestions } from "../controllers/exam.controller.js"
import { protectedRoute, authorizeRoles } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/get", getExam)
router.post("/new", protectedRoute, authorizeRoles("admin"), createExam)
router.get("/all", protectedRoute, authorizeRoles("admin"), getExamSchedule)
router.get("/:examID", getLiveExamQuestions)




export default router