import { NextFunction, Request, Response, } from "express" 

//Podemos fazer por const ou tambem por classe
//Se nos utilizamos o static na criacao de uma classe ela nao precisa ser instanciada

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log ("A rota foi executada")
    console.log (req.hostname)
    console.log (req.ip)
    console.log (req.protocol)

    next ()
}

const logMethodMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log (`O metodo chamado foi ${req.method}`)

    next ()
}

export const meddlewaresForMethodAndLog = [logMethodMiddleware ,logMiddleware]