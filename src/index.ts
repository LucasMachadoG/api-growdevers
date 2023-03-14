import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'
import { growdeverRoutes } from "./routes/growdever.routes"

//O cors define regras pra que nossa API seja chamada de alguma origem

dotenv.config()

const app = express ()
//Aqui nos vamos criar uma configuracao do express para aceitar requisicoes com json no body
app.use(express.json())
app.use(cors())

app.use("/growdever", growdeverRoutes())

//O app.listen nos vamos estar definindo qual url a nossa API vai rodar
// http://localhost:3333
app.listen (process.env.PORT , () => {
    console.log (`API esta rodando na porta ${process.env.PORT}!`)
})

