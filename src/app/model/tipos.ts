//amostra
export interface Tipo {
  sucesso: boolean;
  mensagem: string;
  resultados: Resultado[];
}

export interface Resultado {
  _id: string;
  preco: number;
  estoque: boolean;
  url_imagem: string;
  tipo: string;
  qtd_sabores: number;
  capacidade:number;
  qtd_adicionais: number;
}


//criar

export interface criarTipo {
  tipo: string
  capacidade: number;
  preco: number
  qtd_adicionais: number
  qtd_sabores: number
  estoque: boolean
  url_imagem: string

}







