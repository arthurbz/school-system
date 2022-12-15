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

function EditStudentGrade({ enrollmentId, studentName, callback }: { enrollmentId: string, studentName: string, callback: Function }) {
    const [open, setOpen] = useState(false)
    const [grade, setGrade] = useState(0)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const submitForm = () => {
        fetch(`http://localhost:8000/enrollment/${enrollmentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ grade }),
        })
        .then(() => callback())

        setOpen(false)
    }

    const handleChange = (event: any) => {
        setGrade(parseFloat(event.target.value))
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ mr: 4 }}
            >
                Dar Nota
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
                            Atribuir Nota ao Aluno {studentName}
                        </Typography>

                        <TextField
                            sx={{ width: "100%" }}
                            variant="filled"
                            type={"number"}
                            label="Nota"
                            value={grade}
                            onChange={handleChange}
                        />

                        <Button
                            variant="contained"
                            onClick={submitForm}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Card>
            </Modal>
        </>
    )
}

export default EditStudentGrade
