import { Box, Card, Typography } from "@mui/material"
import { useState, useEffect } from "react"

import CreateStudent from "../components/CreateStudent"
import SchoolHistoryModal from "../components/SchoolHistoryModal"

function Students() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/student`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                data.sort((a: any, b: any) => {
                    return a.id ? 1 : a.id > b.id ? -1 : 0
                })
                setStudents(data)
            })
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "90vh",
                width: "100%"
            }}
        >
            <Box sx={{ display: "flex" }}>
                <CreateStudent />
                <Typography variant="h3">Listando todos Alunos:</Typography>
            </Box>

            {students.map((student: any) => {
                return (
                    <Box key={student.id}>
                        <Card elevation={3} sx={{ width: "100%", p: 4, borderRadius: 5, mt: 2 }}>
                            <Typography><b>Matrícula:</b> {student.id}</Typography>
                            <Typography><b>Aluno:</b> {student.name}</Typography>
                            <Typography><b>Data de Nascimento:</b> {student.birthdate}</Typography>

                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <SchoolHistoryModal studentId={student.id} />
                            </Box>
                        </Card>
                    </Box>
                )
            })}

        </Box>
    )
}

export default Students
