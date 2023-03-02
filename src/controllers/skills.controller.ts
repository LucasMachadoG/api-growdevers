import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/growdever.database";
import { requestError } from "../errors/request.error";
import { serverError } from "../errors/server.error";

export class SkillController {
    public create(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { skills } = req.body
            const database = new GrowdeverDatabase ()

            if (!skills) {
                return requestError.notFoundError(res, "Skill")
            }

            const growdever = database.get(id)

            if (!growdever) {
                return requestError.notFoundError(res, "Growdever")
            }

            //Concat cria uma copia mas ele nao muda o array original
            // growdever.skills = growdever.skills.concat(skills)

            growdever.skills.push(...skills)

            //growdever.skills = [...growdever.skills, ...skills]

            return res.status(201).send({
                ok: true,
                message: "Skills successfully created",
                data: growdever
            })

        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }

    public delete (req: Request, res: Response) {
        try {
            const { id, skill } = req.params

            const database = new GrowdeverDatabase()
            const growdever = database.get(id)

            if (!growdever) {
                return requestError.notFoundError(res, "Growdever")
            }

            const skillIndex = growdever.skills.findIndex((item) => item === skill)

            if (skillIndex < 0) {
                return requestError.notFoundError(res, "Skill")
            }

            growdever.skills.splice(skillIndex, 1)

            return res.status(200).send({
                ok: true,
                message: "Skill successfuly deleted",
                data: growdever
            })

        } catch (error: any) {
            return serverError.genericError (res, error)
        }
    }
}