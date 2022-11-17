import { Router } from "express"
import StudentController from "../controllers/StudentController"

const studentRouter = Router()
const studentController = new StudentController()

studentRouter.post("/student", studentController.create)
studentRouter.get("/student", studentController.findAll)
studentRouter.get("/student/:id", studentController.findById)
studentRouter.put("/student/:id", studentController.update)
studentRouter.delete("/student/:id", studentController.delete)

export default studentRouter
