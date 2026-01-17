import express from "express"
import { createQuestionPool, deleteQuestionPool, fetchAllQuestionPools } from "../controllers/questionPool.controller.js"

const router = express.Router()

router.post("/new", createQuestionPool)
router.get("/all", fetchAllQuestionPools)
router.post("/delete/:id", deleteQuestionPool)


export default router