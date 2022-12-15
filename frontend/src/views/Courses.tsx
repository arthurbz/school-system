import { Box, Button, Card, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import CreateCourse from "../components/CreateCourse"

function Courses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getCourses()
    }, [])

    const getCourses = () => {
        fetch(`http://localhost:8000/course`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                data.sort((a: any, b: any) => {
                    return a.id ? 1 : a.id > b.id ? -1 : 0
                })
                setCourses(data)
            })
    }

    const deleteCourse = (courseId: string) => {
        fetch(`http://localhost:8000/course/${courseId}`, { method: "DELETE" })
            .then(() => getCourses())
    }

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
                <CreateCourse callback={getCourses} />
                <Typography variant="h3">Listando todas Disciplinas:</Typography>
            </Box>

            {courses.map((course: any) => {
                return (
                    <Box key={course.id}>
                        <Card elevation={3} sx={{ width: "100%", p: 4, borderRadius: 5, mt: 2 }}>
                            <Typography variant="h5">Curso</Typography>
                            <Typography><b>Id:</b> {course.id}</Typography>
                            <Typography><b>Nome:</b> {course.title}</Typography>
                            <Typography><b>Data de Início:</b> {course.date}</Typography>

                            <Typography variant="h5" sx={{ mt: 2 }}>Professor</Typography>
                            <Typography><b>Matrícula:</b> {course.Professor.id}</Typography>
                            <Typography><b>Nome:</b> {course.Professor.name}</Typography>
                            <Typography><b>Data de Nascimento:</b> {course.Professor.birthdate}</Typography>

                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    color="error"
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={() => deleteCourse(course.id)}
                                >
                                    Deletar
                                </Button>
                            </Box>
                        </Card>
                    </Box >
                )
            })}

        </Box >
    )
}

export default Courses 
