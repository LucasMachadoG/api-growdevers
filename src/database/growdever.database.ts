//Aqui nos vamos usar classes para agrupar funcionalidades
//Aqui nos podemos fazer um CRUD de growdevers agrupados dentro de uma mesma classe

import { Growdever } from "../models/growdever.models";
import { growdevers } from "./growdevers";

export class GrowdeverDatabase {
    //Listagem de growdevers
    public list () {
        return [
            ...growdevers
        ]
    }

    public get (id: string) {
        return growdevers.find ((growdever) => growdever.id === id)
    }

    public getIndex (id: string) {
        return growdevers.findIndex ((growdever) => growdever.id === id)
    }

    public create (growdever: Growdever) {
        growdevers.push (growdever)
    }

    public delete (index: number) {
        growdevers.splice (index, 1)
    }

    public getBycpf (cpf: number) {
        return growdevers.find ((growdever) => growdever.cpf === cpf)
    } 
}