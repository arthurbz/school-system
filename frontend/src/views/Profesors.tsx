import { Box, Button, Card, Typography } from "@mui/material"
import { useState, useEffect } from "react"

import CreateProfessor from "../components/CreateProfessor"

function Professors() {
    const [professors, setProfessors] = useState([])

    useEffect(() => {
        getProfessors()
    }, [])

    const getProfessors = () => {
        fetch(`http://localhost:8000/professor`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                data.sort((a: any, b: any) => {
                    return a.id ? 1 : a.id > b.id ? -1 : 0
                })
                setProfessors(data)
            })
    }

    const deleteProfessor = (professorId: string) => {
        fetch(`http://localhost:8000/professor/${professorId}`, { method: "DELETE" })
            .then(() => getProfessors())
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
                <CreateProfessor callback={getProfessors} />
                <Typography variant="h3">Listando todos Professores:</Typography>
            </Box>

            {professors.map((professor: any) => {
                return (
                    <Box key={professor.id}>
                        <Card elevation={3} sx={{ width: "100%", p: 4, borderRadius: 5, mt: 2 }}>
                            <Typography><b>Matrícula:</b> {professor.id}</Typography>
                            <Typography><b>Professor:</b> {professor.name}</Typography>
                            <Typography><b>Data de Nascimento:</b> {professor.birthdate}</Typography>

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button
                                    color="error"
                                    variant="contained"
                                    sx={{ mt: 2, height: "100%" }}
                                    onClick={() => deleteProfessor(professor.id)}
                                >
                                    Deletar
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                )
            })}

        </Box>
    )
}

export default Professors
