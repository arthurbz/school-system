import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { NullException } from "../types/Exceptions"

class ProfessorController {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    create = async (req: Request, res: Response) => {
        const { name, birthdate } = req.body

        if (!name || !birthdate)
            throw new NullException("Missing informations to create Professor")

        const student = await this.prisma.professor.create({
            data: {
                name: name,
                birthdate: new Date(birthdate)
            }
        })

        res.send(student)
    }

    findAll = async (req: Request, res: Response) => {
        const users = await this.prisma.professor.findMany({
            select: {
                id: true,
                name: true,
                birthdate: true,
            }
        })

        res.send(users)
    }

    findById = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id || typeof id !== "string")
            throw new NullException("Email can't be null")

        const student = await this.prisma.professor.findFirstOrThrow({
            select: {
                id: true,
                name: true,
            },
            where: { id }
        })

        res.send(student)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { name, birthdate } = req.body

        await this.prisma.professor.findFirstOrThrow({ where: { id } })
        await this.prisma.professor.update({
            data: {
                name: name,
                birthdate: birthdate ? new Date(birthdate) : undefined,
            },
            where: { id }
        })

        res.send()
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        await this.prisma.professor.findFirstOrThrow({ where: { id } })
        await this.prisma.professor.delete({ where: { id } })

        res.send()
    }
}

export default ProfessorController
