import { useEffect, useState } from "react"
import { Box, Card, Modal, Button, TextField, Typography } from "@mui/material"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
}

function SchoolHistoryModal({ studentId }: { studentId: string }) {
    const [open, setOpen] = useState(false)
    const [student, setStudent] = useState({ id: "", name: "", birthdate: "" })
    const [enrollments, setEnrollments] = useState([])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        fetch(`http://localhost:8000/student/${studentId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => setStudent(data))

        fetch(`http://localhost:8000/enrollment/student/${studentId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                data.sort((a: any, b: any) => {
                    return a.id ? 1 : a.id > b.id ? -1 : 0
                })
                setEnrollments(data)
            })
    }, [studentId])

    return (
        <>
            <Button
                sx={{ margin: "auto" }}
                variant="contained"
                onClick={handleOpen}
            >
                Histórico Escolar
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Card sx={style}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3
                    }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Histórico Escolar de {student.name}
                        </Typography>

                        {enrollments.length > 0 ?
                            enrollments.map((enrollment: any) => {
                                return (
                                    <Box key={enrollment.id} sx={{ display: "flex", alignItems: "left" }}>
                                        <Typography sx={{ mr: 4 }}><b>Id da Inscrição:</b><br></br> {enrollment.id}</Typography>
                                        <Typography sx={{ mr: 4 }}><b>Curso:</b><br></br> {enrollment.course.title}</Typography>
                                        <Typography sx={{ mr: 4 }}><b>Data de Início:</b><br></br> {enrollment.enrollmentDate}</Typography>
                                        <Typography sx={{ mr: 4 }}><b>Nota:</b><br></br> {enrollment.grade}</Typography>
                                    </Box>
                                )
                            })
                            : <Typography>Este aluno não foi matrículado em nenhuma disciplina</Typography>
                        }

                        <Button
                            color="success"
                            variant="contained"
                            onClick={handleClose}
                        >
                            OK
                        </Button>
                    </Box>
                </Card>
            </Modal>
        </>
    )
}

export default SchoolHistoryModal 
