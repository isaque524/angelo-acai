export interface Sabores {
  sucesso: boolean
  mensagem: string
  resultados: ResultadoSabores[]
}

export interface ResultadoSabores {
  _id: string
  nome: string
  tipo: string
  estoque: boolean
  url_imagem: string
}

export interface CriarSaborNovo {
  nome: string
  tipo: string
  url_imagem: string
  estoque: boolean
}

export interface PegarSabor{
  tipo: string
  nome: string
}
