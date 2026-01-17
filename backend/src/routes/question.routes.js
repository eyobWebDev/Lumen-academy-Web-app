import express from "express"
import upload from "../config/upload.js"
import { createQuestion, deleteQuestion, fetchAllQuestion, uploadQuestion } from "../controllers/question.controller.js"

const router = express.Router()

router.post("/new", createQuestion)
router.get("/all", fetchAllQuestion)
router.post("/delete/:id", deleteQuestion)
router.post("/upload", upload.single("file"), uploadQuestion)


export default router