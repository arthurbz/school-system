import { useState } from "react"
import { Box, Card, Modal, Button, TextField, Typography } from "@mui/material"

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

function CreateProfessor({ callback }: { callback: Function }) {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState("")
    const [birthdate, setBirthdate] = useState("")

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleChangeName = (event: any) => {
        setName(event.target.value)
    }

    const handleChangeBirthdate = (event: any) => {
        setBirthdate(event.target.value)
    }

    const submitForm = () => {
        fetch("http://localhost:8000/professor", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ name, birthdate }),
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
                            Cadastro de Professor:
                        </Typography>

                        <TextField
                            sx={{ width: "100%" }}
                            variant="filled"
                            label="Nome"
                            value={name}
                            onChange={handleChangeName}
                        />

                        <TextField
                            sx={{ width: "100%" }}
                            variant="filled"
                            label="Data de Nascimento"
                            value={birthdate}
                            onChange={handleChangeBirthdate}
                        />

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

export default CreateProfessor
