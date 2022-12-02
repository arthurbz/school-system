import { useState } from "react"
import { Button, Box, TextField, Typography } from "@mui/material"

function StudentsHomePage() {
    const [studentId, setStudentId] = useState("clb5orj5m0000yep4yu5efp3m")
    const [student, setStudent] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

    const handleLogin = () => {
        if (studentId) {
            fetch(`http://localhost:8000/student/${studentId}`,
                { method: "GET" }
            )
                .then(response => {
                    if (response.status === 200) {
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
                        >
                            Histórico Escolar
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ fontWeight: "bold" }}
                        >
                            Todas Notas
                        </Button>
                    </Box>
            }
        </Box>
    )
}

export default StudentsHomePage
