import { useState } from "react"
import { Button, Box, TextField, Typography } from "@mui/material"

function StudentsPage() {
    const [studentId, setStudentId] = useState("clb5orj5m0000yep4yu5efp3m")
    const [student, setStudent] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [showGrades, setShowGrades] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [history, setHistory] = useState([])

    const handleLogin = () => {
        if (studentId) {
            fetch(`http://localhost:8000/student/${studentId}`,
                { method: "GET" }
            )
                .then(response => {
                    if (response.status == 200) {
                        console.log("Login Success")
                        setLoggedIn(true)
                        return response.json()
                    }
                    setLoggedIn(false)
                    return {}
                })
                .then(data => setStudent(student))
        }
    }

    const handleHistory = () => {
        fetch(`http://localhost:8000/enrollment/student/${studentId}`,
            { method: "GET" }
        )
            .then(response => response.json())
            .then(data => setHistory(data))

        setShowHistory(true)
        setShowGrades(false)
    }

    const handleGrades = () => {
        setShowGrades(true)
        setShowHistory(false)
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
                    <Box sx={{ display: "flex", gap: 5 }}>
                        <Button
                            variant="contained"
                            sx={{ fontWeight: "bold" }}
                            onClick={handleHistory}
                        >
                            Histórico Escolar
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ fontWeight: "bold" }}
                            onClick={handleHistory}
                        >
                            Todas Notas
                        </Button>
                    </Box>
            }

            {/*SCHOLAR HISTORY*/}
            {
                showHistory ?
                    <Box>
                        <Typography> Histórico Escolar </Typography>
                        {history.length > 0 ?
                            <>
                                {
                                    history.map((course) => {
                                        return <h1>{course}</h1>
                                    })
                                }
                            </>
                            : <Typography>Sem Disciplinas</Typography>
                        }
                    </Box>
                    : <></>
            }

            {/*SEARCH GRADE*/}
            {
                showHistory ?
                    <Box>
                    </Box>
                    : <></>
            }
        </Box>
    )
}

export default StudentsPage
