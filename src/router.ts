import { Router } from "express"
import studentRouter from "./routes/StudentRouter"
import professorRouter from "./routes/ProfessorRouter"
import courseRouter from "./routes/CourseRouter"

const router = Router()

router.use(studentRouter)
router.use(professorRouter)
router.use(courseRouter)

export default router
