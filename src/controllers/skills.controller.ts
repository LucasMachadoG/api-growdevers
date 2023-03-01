import { Request, Response } from "express";
import { GrowdeverDatabase } from "../database/growdever.database";

export class SkillController {
    public create(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { skills } = req.body
            const database = new GrowdeverDatabase ()

            if (!skills) {
                return res.status(400).send ({
                    ok: false,
                    message: "Skills were not provider"
                })
            }

            const growdever = database.get(id)

            if (!growdever) {
                return res.status(404).send ({
                    ok: false,
                    message: "Growdever not found"
                })
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
            return res.status(500).send ({
                ok: false, 
                messagem: error.toString()
            })
        }
    }

    public delete (req: Request, res: Response) {
        try {
            const { id, skill } = req.params

            const database = new GrowdeverDatabase()
            const growdever = database.get(id)

            if (!growdever) {
                return res.status(404).send ({
                    ok: false,
                    message: "Growdever not found"
                })
            }

            const skillIndex = growdever.skills.findIndex((item) => item === skill)

            if (skillIndex < 0) {
                return res.status(404).send({
                    ok: false,
                    message: "Skill not found"
                })
            }

            growdever.skills.splice(skillIndex, 1)

            return res.status(200).send({
                ok: true,
                message: "Skill successfuly deleted",
                data: growdever
            })

        } catch (error: any) {
            return res.status(500).send ({
                ok: false,
                message: error.toString()
            })
        }
    }
}