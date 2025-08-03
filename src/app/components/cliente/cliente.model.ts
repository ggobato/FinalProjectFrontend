import { ContatoDTO } from "src/app/models/contato.model"

export interface ClienteDTO {
    id_cliente?: number
    nome_cli: string
    cpf_cli: string
    telefone_cli: string
    email_cli: string
    contatos: ContatoDTO
}