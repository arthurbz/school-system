import { Router } from "express"
import studentRouter from "./routes/StudentRouter"
import professorRouter from "./routes/ProfessorRouter"
import courseRouter from "./routes/CourseRouter"
import enrollmentRouter from "./routes/EnrollmentController"

const router = Router()

router.use(studentRouter)
router.use(professorRouter)
router.use(courseRouter)
router.use(enrollmentRouter)

export default router
