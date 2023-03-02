//A ideia do controller eh ter um metodo para cada rota que nos tiver na nossa API  
import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/growdever.database";
import { requestError } from "../errors/request.error";
import { serverError } from "../errors/server.error";
import { Growdever } from "../models/growdever.models";

export class GrowdeverController {
    public list(req: Request, res: Response) {
        try {
            //Desestruturando o nosso objeto
            const { idade } = req.query

            // const params = req.query
            // console.log (params)

            const database = new GrowdeverDatabase ()
            let growdevers = database.list ()

            if (idade) {
                growdevers = growdevers.filter ((growdever) => {
                    return growdever.idade === Number(idade)
                })
            }

            const result = growdevers.map ((growdever) => {
                return growdever.toJson()
            })

            res.status (200).send ({
                ok: true, 
                message: "Growdevers successfully listed",
                data: result
            })
        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }

    public get (req: Request, res: Response) {
        try {
            const { id } = req.params

            const database = new GrowdeverDatabase ()
            const growdever = database.get(id)

            if (!growdever) {
                return requestError.notFoundError(res, "Growdever")
            }
            
            res.status (200).send ({
                ok: true, 
                message: "Growdever successfully obtained",
                data: growdever
            })
        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }

    public create (req: Request, res: Response) {
        try {
            const {nome, idade, cidade, cpf,  skills} = req.body

            if (!nome) {
                // return res.status(400).send({
                //     ok: false,
                //     message: "Nome was not provided"
                // })

                return requestError.fieldNotProvided(res, "Nome")
            }

            if (!idade) {
                return requestError.fieldNotProvided (res, "Idade")
            }

            if (!cidade) {
                return requestError.fieldNotProvided (res, "Cidade")
            }

            if (!cpf) {
                return requestError.fieldNotProvided (res, "CPF")
            }

            const growdever = new Growdever(nome, idade, cidade, cpf, skills)

            const database = new GrowdeverDatabase ()
            database.create(growdever)

            res.status (201).send ({
                ok: true, 
                message: "Growdever successfully created",
                data: growdever
            })

        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }

    public delete (req: Request, res: Response) {
        try {
            const { id } = req.params

            const database = new GrowdeverDatabase()
            const growdeverIndex = database.getIndex(id)

            if (growdeverIndex < 0) {
                return requestError.notFoundError(res, "Growdever")
            }

            database.delete(growdeverIndex)

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully deleted"
            })

        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }

    public update (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { idade } = req.body

            const database = new GrowdeverDatabase()
            const growdever = database.get(id)

            if (!growdever) {
                return requestError.notFoundError(res, "Growdever")
            }

           if (idade) {
                growdever.idade = idade
           }

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully update"
            })

        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }
}