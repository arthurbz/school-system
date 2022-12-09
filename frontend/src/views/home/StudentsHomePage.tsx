import { useState, useEffect } from "react"
import { Button, FormControl, InputLabel, Select, MenuItem, Box, TextField, Typography } from "@mui/material"
import SchoolHistoryModal from "../../components/SchoolHistoryModal"

function StudentsHomePage() {
    const [studentId, setStudentId] = useState("")
    const [enrollmentId, setEnrollmentId] = useState("")
    const [student, setStudent] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [enrollments, setEnrollments] = useState([])
    const [enrollment, setEnrollment] = useState<any>({})

    const handleLogin = () => {
        if (studentId) {
            fetch(`http://localhost:8000/student/${studentId}`,
                { method: "GET" }
            )
                .then(response => {
                    if (response.status === 200) {
                        setLoggedIn(true)
                        return response.json()
                    }
                    setLoggedIn(false)
                    return {}
                })
                .then(data => setStudent(student))
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8000/enrollment`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setEnrollments(data)
            })
    }, [])

    const handleChangeEnrollmentId = (event: any) => {
        setEnrollmentId(event.target.value)
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "90vh"
        }}>
            <Typography variant="h3">
                Aluno
            </Typography>

            {/* LOGIN */}
            {
                !loggedIn ?
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            value={studentId}
                            onChange={(event) => setStudentId(event.target.value)}
                            label="Matrícula"
                        />

                        <Button
                            variant="contained"
                            sx={{ ml: 2 }}
                            onClick={handleLogin}
                        >
                            Entrar
                        </Button>
                    </div>
                    :
                    <Box>
                        <SchoolHistoryModal studentId={studentId} />

                        {/*<Box sx={{ display: "column" }}>
                            <Typography variant="h5" sx={{ mt: 10 }}>
                                Buscar nota por disciplina:
                            </Typography>

                            <FormControl fullWidth>
                                <InputLabel sx={{ mt: 1 }}>Disciplina</InputLabel>

                                <Box sx={{ display: "flex" }}>
                                    <Select
                                        variant="filled"
                                        label="Disciplina"
                                        value={enrollmentId}
                                        onChange={handleChangeEnrollmentId}
                                        sx={{ width: 300 }}
                                    >
                                        {enrollments.map((enrollment: any) => {
                                            return <MenuItem key={enrollment.id} value={enrollment.id} >
                                                {enrollment.course.title}
                                            </MenuItem>
                                        })}
                                    </Select>
                                </Box>
                            </FormControl>
                                    </Box>*/}
                    </Box>
            }
        </Box >
    )
}

export default StudentsHomePage
