import express from "express"
import { GrowdeverController } from "./controllers/growdever.controller"
import { GrowdeverDatabase } from "./database/growdever.database"

const app = express ()
//Aqui nos vamos criar uma configuracao do express para aceitar requisicoes com json no body
app.use(express.json())

//GET http://localhost:3333/
app.get("/", (req, res) => {
    res.send ({
        ok: true,
        message: "Tudo OK"
    })
})


//Get http://localhost:3333/growdever
app.get ("/growdever", new GrowdeverController().list)

//Os dois pontos significa que eu posso passar um valor dinamico
//GET http://localhost:3333/growdever/abc-1234
app.get ("/growdever/:id", new GrowdeverController().get)


//Quando nos queremos criar alguma coisa nos utilizamos o post
//POST http://localhost:3333/growdever
app.post ("/growdever", new GrowdeverController().create)

//DELETE http://localhost:3333/growdever/abc-1234
app.delete ("/growdever/:id", new GrowdeverController().delete)

//PUT http://localhost:3333/growdever/abc-1234
app.put("/growdever/:id", new GrowdeverController().update)

//O app.listen nos vamos estar definindo qual url a nossa API vai rodar
// http://localhost:3333
app.listen (3333, () => {
    console.log ("API esta rodando...")
})

