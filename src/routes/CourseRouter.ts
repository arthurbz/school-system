import { Router } from "express"
import CourseController from "../controllers/CourseController"

const courseRouter = Router()
const courseController = new CourseController()

courseRouter.post("/course", courseController.create)
courseRouter.get("/course", courseController.findAll)
courseRouter.get("/course/:id", courseController.findById)
courseRouter.put("/course/:id", courseController.update)
courseRouter.delete("/course/:id", courseController.delete)

export default courseRouter
