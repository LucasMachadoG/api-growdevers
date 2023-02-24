//Esse uuid vai criar id para nos 
import { v4 as createUuid} from 'uuid'

export class Growdever {
    private _id: string
    
    constructor (
        private _nome: string, 
        private _idade: number, 
        private _cidade: string, 
        private _skills: string []
    ){
        this._id = createUuid ()
    }

    //Existe uma forma de manter a nossa propriedade privada mas abrir ela apenas para consulta
    //A diferenca eh que com o getter quando eu fosse chamar ele, chamaria como se fosse um atributo

    //getter
    public get idade () {
        return this._idade
    }

    public get id () {
        return this._id
    }

    public set idade (idade: number) {
        this._idade = idade
    }

    //criando um adapter

    public toJson () {
        return {
            id: this._id,
            nome: this._nome,
            idade: this._idade,
            cidade: this._cidade,
            skills: this._skills
        }
    }
}