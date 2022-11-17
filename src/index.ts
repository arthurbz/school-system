import "express-async-errors"
import express from "express"
import router from "./router"

const app = express()
const port = 3000

app.use(express.json())
app.use(router)

//Middleware to handle errors
//TO-DO : Separate into a middleware file/folder
app.use((error, req, res, next) => {
    res.status(error.statusCode ?? 500).send({ "errorMessage": error.message })
})

//TO-DO : Revise all status codes and change accordingly such as 201, 204, 401, 403, 500, and so on
//TO-DO : Revise bad parameters exceptions, create something more specific like InvalidParametersException
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})
