import express from "express"
import { createQuestionPool, deleteQuestionPool, fetchAllQuestionPools } from "../controllers/questionPool.controller.js"
import { protectedRoute, authorizeRoles } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/new",protectedRoute, authorizeRoles("admin"), createQuestionPool)
router.get("/all", fetchAllQuestionPools)
router.post("/delete/:id",protectedRoute, authorizeRoles("admin"), deleteQuestionPool)


export default router