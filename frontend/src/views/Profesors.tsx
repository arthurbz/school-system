import { Box, Card, Typography } from "@mui/material"
import { useState, useEffect } from "react"

import CreateProfessor from "../components/CreateProfessor"

function Professors() {
    const [professors, setProfessors] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/professor`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setProfessors(data)
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
                <CreateProfessor />
                <Typography variant="h3">Listando todos Professores:</Typography>
            </Box>

            {professors.map((professor: any) => {
                return (
                    <Box key={professor.id}>
                        <Card elevation={3} sx={{ width: "100%", p: 2, borderRadius: 5, mt: 2 }}>
                            <Typography><b>Matrícula:</b> {professor.id}</Typography>
                            <Typography><b>Professor:</b> {professor.name}</Typography>
                            <Typography><b>Data de Nascimento:</b> {professor.birthdate}</Typography>
                        </Card>
                    </Box>
                )
            })}

        </Box>
    )
}

export default Professors
