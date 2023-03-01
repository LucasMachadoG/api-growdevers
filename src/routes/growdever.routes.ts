//Aqui vai ficar todas as nossas rotas

import { GrowdeverController } from "../controllers/growdever.controller"
import { Router } from "express" 
import { SkillController } from "../controllers/skills.controller"

export const growdeverRoutes = () => {

    const app = Router()

    //Get http://localhost:3333/growdever
    app.get ("/", new GrowdeverController().list)

    //Os dois pontos significa que eu posso passar um valor dinamico
    //GET http://localhost:3333/growdever/abc-1234
    app.get ("/:id", new GrowdeverController().get)

    //Quando nos queremos criar alguma coisa nos utilizamos o post
    //POST http://localhost:3333/growdever
    app.post ("/", new GrowdeverController().create)

    //DELETE http://localhost:3333/growdever/abc-1234
    app.delete ("/:id", new GrowdeverController().delete)

    //PUT http://localhost:3333/growdever/abc-1234
    app.put("/:id", new GrowdeverController().update) 

    //POST http://localhost:3333/growdever/abc-1234/skill
    app.post ("/:id/skill", new SkillController().create)

    //DELETE http://localhost:3333/growdever/abc-1234/skill/nodejs
    // app.delete ("/:id/skill/:skill", new SkillController().delete)

    return app
}