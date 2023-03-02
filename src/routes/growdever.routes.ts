//Aqui vai ficar todas as nossas rotas
//Os middlewares tambem sao criados aq nas rotas

import { GrowdeverController } from "../controllers/growdever.controller"
import { Router } from "express" 
import { SkillController } from "../controllers/skills.controller"
import { meddlewaresForMethodAndLog } from "../middlewares/log.middleware"
import { cpfValidMiddleware } from "../middlewares/cpfvalidated.middleware"
import { cpfAlreadyExists } from "../middlewares/cpfvalidated.middleware"


export const growdeverRoutes = () => {

    //O router eh como se fosse uma ramificacao do app principal para nos criar rotas em arquivos separados
    const app = Router()

    //Get http://localhost:3333/growdever
    app.get ("/", meddlewaresForMethodAndLog ,new GrowdeverController().list)

    //Os dois pontos significa que eu posso passar um valor dinamico
    //GET http://localhost:3333/growdever/abc-1234
    app.get ("/:id", meddlewaresForMethodAndLog ,new GrowdeverController().get)

    //Quando nos queremos criar alguma coisa nos utilizamos o post
    //POST http://localhost:3333/growdever
    app.post ("/", cpfValidMiddleware, cpfAlreadyExists, new GrowdeverController().create)

    //DELETE http://localhost:3333/growdever/abc-1234
    app.delete ("/:id", meddlewaresForMethodAndLog, new GrowdeverController().delete)

    //PUT http://localhost:3333/growdever/abc-1234
    app.put("/:id", meddlewaresForMethodAndLog, new GrowdeverController().update) 

    //POST http://localhost:3333/growdever/abc-1234/skill
    app.post ("/:id/skill", meddlewaresForMethodAndLog, new SkillController().create)

    //DELETE http://localhost:3333/growdever/abc-1234/skill/nodejs
    app.delete ("/:id/skill/:skill", meddlewaresForMethodAndLog, new SkillController().delete)

    return app
}