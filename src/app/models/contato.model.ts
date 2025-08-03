export interface ContatoDTO {
     id_contato?: number;
     cep: string;
     municipio: string;
     logradouro: string;
     numero: string;
     complemento?: string;
     uf: string;
}