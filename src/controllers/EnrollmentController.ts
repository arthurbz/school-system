import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { InvalidInfoException, NullException } from "../types/Exceptions"

class EnrollmentController {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    create = async (req: Request, res: Response) => {
        const { grade, courseId, studentId } = req.body

        if (!courseId || !studentId)
            throw new NullException("Missing informations to create Enrollment")

        if (grade && typeof grade != "number" || grade < 0 || grade > 10)
            throw new InvalidInfoException("Grade must be a number between 0 and 10")

        await this.prisma.student.findFirstOrThrow({ where: { id: studentId } })
        await this.prisma.course.findFirstOrThrow({ where: { id: courseId } })
        const course = await this.prisma.enrollment.create({
            data: {
                grade: grade ?? 0,
                studentId: studentId,
                courseId: courseId
            }
        })

        res.send(course)
    }

    findAll = async (req: Request, res: Response) => {
        const enrollments = await this.prisma.enrollment.findMany({
            select: {
                id: true,
                enrollmentDate: true,
                grade: true,
                course: true,
                student: true,
            }
        })

        res.send(enrollments)
    }

    findById = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id || typeof id !== "string")
            throw new NullException("Id can't be null")

        const enrollment = await this.prisma.enrollment.findFirstOrThrow({
            select: {
                id: true,
                enrollmentDate: true,
                grade: true,
                course: true,
                student: true,
            },
            where: { id }
        })

        res.send(enrollment)
    }

    findByStudentId = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id || typeof id !== "string")
            throw new NullException("Id can't be null")

        await this.prisma.student.findFirstOrThrow({ where: { id } })
        const enrollments = await this.prisma.enrollment.findMany({
            select: {
                id: true,
                enrollmentDate: true,
                grade: true,
                course: true,
                student: true,
            },
            where: { studentId: id }
        })

        res.send(enrollments)
    }

    findByCourseId = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id || typeof id !== "string")
            throw new NullException("Id can't be null")

        await this.prisma.course.findFirstOrThrow({ where: { id } })
        const enrollments = await this.prisma.enrollment.findMany({
            select: {
                id: true,
                enrollmentDate: true,
                grade: true,
                course: true,
                student: true,
            },
            where: { courseId: id }
        })

        res.send(enrollments)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { grade } = req.body

        if (typeof grade != "number" || grade < 0 || grade > 10)
            throw new InvalidInfoException("Grade must be a number between 0 and 10")

        await this.prisma.enrollment.findFirstOrThrow({ where: { id } })
        await this.prisma.enrollment.update({
            data: { grade },
            where: { id }
        })

        res.send()
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        await this.prisma.enrollment.findFirstOrThrow({ where: { id } })
        await this.prisma.enrollment.delete({ where: { id } })

        res.send()
    }
}

export default EnrollmentController
