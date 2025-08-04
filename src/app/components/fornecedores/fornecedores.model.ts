import { ContatoDTO } from "src/app/models/contato.model"

export interface FornecedorDTO {
    id_fornecedor?: number
    nome_for: string
    razao_social_for: string
    cnpj_for: string
    telefone_for: string
    email_for: string
    contatos: ContatoDTO
}