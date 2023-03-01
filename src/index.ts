import express from "express"
import { growdeverRoutes } from "./routes/growdever.routes"

const app = express ()
//Aqui nos vamos criar uma configuracao do express para aceitar requisicoes com json no body
app.use(express.json())

app.use("/growdever", growdeverRoutes())

//O app.listen nos vamos estar definindo qual url a nossa API vai rodar
// http://localhost:3333
app.listen (3333, () => {
    console.log ("API esta rodando...")
})

