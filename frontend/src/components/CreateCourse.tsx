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

function CreateCourse({ callback }: { callback: Function }) {
    const [open, setOpen] = useState(false)

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [professorId, setProfessorId] = useState("")
    const [professors, setProfessors] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/professor`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setProfessors(data)
            })
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleChangeTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const handleChangeDate = (event: any) => {
        setDate(event.target.value)
    }

    const handleChangeSelect = (event: any) => {
        setProfessorId(event.target.value)
    }

    const submitForm = () => {
        fetch("http://localhost:8000/course", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, date, professorId }),
        })
            .then(() => callback())

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
                            Cadastro de Disciplinas:
                        </Typography>

                        <TextField
                            sx={{ width: "100%" }}
                            variant="filled"
                            label="Nome"
                            value={title}
                            onChange={handleChangeTitle}
                        />

                        <TextField
                            sx={{ width: "100%" }}
                            variant="filled"
                            label="Data de Início"
                            value={date}
                            onChange={handleChangeDate}
                        />

                        <FormControl fullWidth>
                            <InputLabel sx={{ mt: 1 }}>Professor</InputLabel>
                            <Select
                                variant="filled"
                                label="Professor"
                                value={professorId}
                                onChange={handleChangeSelect}
                            >
                                {professors.map((professor: any) => {
                                    return <MenuItem key={professor.id} value={professor.id} >
                                        {professor.name}
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

export default CreateCourse
