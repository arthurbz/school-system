import { Box, Card, Typography } from "@mui/material"
import { useState, useEffect } from "react"

import CreateStudent from "../components/CreateStudent"

function Students() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/student`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setStudents(data)
                console.log(data)
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
                        <Card elevation={3} sx={{ width: "100%", p: 2, borderRadius: 5, mt: 2 }}>
                            <Typography><b>Matrícula:</b> {student.id}</Typography>
                            <Typography><b>Aluno:</b> {student.name}</Typography>
                            <Typography><b>Data de Nascimento:</b> {student.birthdate}</Typography>
                        </Card>
                    </Box>
                )
            })}

        </Box>
    )
}

export default Students
