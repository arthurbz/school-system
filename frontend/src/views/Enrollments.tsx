import { Box, Card, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import EditStudentGrade from "../components/EditStudentGrade"

function Enrollments() {
    const [enrollments, setEnrollmnets] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/enrollment`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setEnrollmnets(data)
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
                <Typography variant="h3">Listando todas Notas:</Typography>
            </Box>

            {enrollments.map((enrollment: any) => {
                return (
                    <Box key={enrollment.id}>
                        <Card elevation={3} sx={{ width: "100%", p: 2, borderRadius: 5, mt: 2 }}>
                            <Typography variant="h5" sx={{ mt: 2 }}>Matrícula nesta Disciplina</Typography>
                            <Typography><b>Data de Inscrição:</b> {enrollment.enrollmentDate}</Typography>
                            <Typography><b>Nota Final:</b> {enrollment.grade}</Typography>

                            <Typography variant="h5" sx={{ mt: 2 }}>Disciplina</Typography>
                            <Typography><b>Nome:</b> {enrollment.course.title}</Typography>

                            <Typography variant="h5" sx={{ mt: 2 }}>Aluno</Typography>
                            <Typography><b>Matrícula:</b> {enrollment.student.id}</Typography>
                            <Typography><b>Nome:</b> {enrollment.student.name}</Typography>
                            <Typography><b>Data de Nascimento:</b> {enrollment.student.birthdate}</Typography>

                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <EditStudentGrade
                                    key={enrollment.id}
                                    enrollmentId={enrollment.id}
                                    studentName={enrollment.student.name}
                                />
                            </Box>
                        </Card>
                    </Box>
                )
            })}

        </Box>
    )
}

export default Enrollments 
