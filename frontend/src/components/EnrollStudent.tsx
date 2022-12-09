import { useEffect, useState } from "react"
import { Box, MenuItem, FormControl, InputLabel, Select, Card, Modal, Button, TextField, Typography } from "@mui/material"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

function EnrollStudent() {
    const [open, setOpen] = useState(false)
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [studentId, setStudentId] = useState("")
    const [courseId, setCourseId] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8000/student`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setStudents(data)
            })

        fetch(`http://localhost:8000/course`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setCourses(data)
            })
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleChangeCourseId = (event: any) => {
        setCourseId(event.target.value)
    }

    const handleChangeStudentId = (event: any) => {
        setStudentId(event.target.value)
    }

    const submitForm = () => {
        fetch("http://localhost:8000/enrollment", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ courseId, studentId }),
        })

        setOpen(false)
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ mr: 4 }}
            >
                Cadastrar
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
                        <Typography variant="h5">
                            Matrícular aluno em disciplina:
                        </Typography>

                        <FormControl fullWidth>
                            <InputLabel sx={{ mt: 1 }}>Aluno</InputLabel>
                            <Select
                                variant="filled"
                                label="Aluno"
                                value={studentId}
                                onChange={handleChangeStudentId}
                            >
                                {students.map((student: any) => {
                                    return <MenuItem key={student.id} value={student.id} >
                                        {student.name}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel sx={{ mt: 1 }}>Disciplina</InputLabel>
                            <Select
                                variant="filled"
                                label="Disciplina"
                                value={courseId}
                                onChange={handleChangeCourseId}
                            >
                                {courses.map((course: any) => {
                                    return <MenuItem key={course.id} value={course.id} >
                                        {course.title}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            onClick={submitForm}
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Card>
            </Modal>
        </>
    )
}

export default EnrollStudent
