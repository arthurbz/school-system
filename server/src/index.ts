import "express-async-errors"
import express from "express"
import router from "./router"
import cors from "cors"

const app = express()
const port = 8000

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(router)

app.use((error, req, res, next) => {
    res.status(error.statusCode ?? 500).send({ "errorMessage": error.message })
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})
