import { Router } from "express"
import EnrollmentController from "../controllers/EnrollmentController"

const enrollmentRouter = Router()
const enrollmentController = new EnrollmentController()

enrollmentRouter.post("/enrollment", enrollmentController.create)
enrollmentRouter.get("/enrollment", enrollmentController.findAll)
enrollmentRouter.get("/enrollment/:id", enrollmentController.findById)
enrollmentRouter.get("/enrollment/student/:id", enrollmentController.findByStudentId)
enrollmentRouter.get("/enrollment/course/:id", enrollmentController.findByCourseId)
enrollmentRouter.put("/enrollment/:id", enrollmentController.update)
enrollmentRouter.delete("/enrollment/:id", enrollmentController.delete)

export default enrollmentRouter
