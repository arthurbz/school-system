import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function SchoolHomePage() {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
            }}
        >
            <Typography variant="h3">
                Área de Professores
            </Typography>

            <Box sx={{ mt: 10, display: "flex", gap: 10 }}>
                <Button
                    variant="contained"
                    sx={{ fontWeight: "bold", fontSize: 25 }}
                    onClick={() => { navigate("/students") }}
                >
                    Alunos
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontWeight: "bold", fontSize: 25 }}
                    onClick={() => { navigate("/professors") }}
                >
                    Professores
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontWeight: "bold", fontSize: 25 }}
                    onClick={() => { navigate("/courses") }}
                >
                    Disciplinas
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontWeight: "bold", fontSize: 25 }}
                    onClick={() => { navigate("/enrollments") }}
                >
                    Notas
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontWeight: "bold", fontSize: 25 }}
                    onClick={() => { navigate("/school-history") }}
                >
                    Históricos Escolares
                </Button>
            </Box>
        </Box>
    )
}

export default SchoolHomePage;
