import { Router } from "express"
import ProfessorController from "../controllers/ProfessorController"

const professorRouter = Router()
const professorController = new ProfessorController()

professorRouter.post("/professor", professorController.create)
professorRouter.get("/professor", professorController.findAll)
professorRouter.get("/professor/:id", professorController.findById)
professorRouter.put("/professor/:id", professorController.update)
professorRouter.delete("/professor/:id", professorController.delete)

export default professorRouter
