import { Button, Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 100,
            height: "90vh",
        }}>
            <Typography sx={{ fontSize: 80 }}>
                <b>🏫 Sistema Escolar</b>
            </Typography>

            <Box sx={{ display: "flex", gap: 20 }}>
                <Button
                    variant="outlined"
                    sx={{ fontWeight: "bold", fontSize: 40 }}
                    onClick={() => { navigate("/school-home") }}
                >
                    Instituição
                </Button>

                <Button
                    variant="outlined"
                    sx={{ fontWeight: "bold", fontSize: 40 }}
                    onClick={() => { navigate("/student-home") }}
                >
                    Sou um Aluno
                </Button>
            </Box>
        </div>
    )
}

export default HomePage
