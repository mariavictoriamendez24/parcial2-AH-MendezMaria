import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import dietas_routes from "./routes/dietas_routes.js"
import nutricionista_routes from "./routes/nutricionista_routes.js"

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("conectados al db"))
    .catch(() => console.log("error al conectar"))

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/dietas", dietas_routes )
app.use("/nutricionista", nutricionista_routes )


const port = process.env.PORT || 3000
app.listen(port)