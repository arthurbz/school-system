import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { NullException } from "../types/Exceptions"

class CourseController {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    create = async (req: Request, res: Response) => {
        const { title, date, professorId } = req.body

        if (!title || !date || !professorId)
            throw new NullException("Missing informations to create Course")

        await this.prisma.professor.findFirstOrThrow({ where: { id: professorId } })
        const course = await this.prisma.course.create({
            data: {
                title: title,
                date: new Date(date),
                professorId: professorId
            }
        })

        res.send(course)
    }

    findAll = async (req: Request, res: Response) => {
        const courses = await this.prisma.course.findMany({
            select: {
                id: true,
                title: true,
                date: true,
                Professor: true,
            }
        })

        res.send(courses)
    }

    findById = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id || typeof id !== "string")
            throw new NullException("Id can't be null")

        const course = await this.prisma.course.findFirstOrThrow({
            select: {
                id: true,
                title: true,
                date: true,
                Professor: true,
            },
            where: { id }
        })

        res.send(course)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { title, date, professorId } = req.body

        await this.prisma.course.findFirstOrThrow({ where: { id } })
        await this.prisma.professor.findFirstOrThrow({ where: { id: professorId } })
        await this.prisma.course.update({
            data: {
                title: title,
                professorId: professorId,
                date: date ? new Date(date) : undefined,
            },
            where: { id }
        })

        res.send()
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        await this.prisma.course.findFirstOrThrow({ where: { id } })
        await this.prisma.course.delete({ where: { id } })

        res.send()
    }
}

export default CourseController 
