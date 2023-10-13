import { Sabores } from './../model/sabores';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PegarSabor } from '../model/sabores';
import { Listadicional } from '../model/adicional';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public tiposList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getProducts() {
    return this.tiposList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.tiposList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.tiposList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((a: any) => {
      return (
        product.sabores !== a.sabores ||
        product.tipo !== a.tipo ||
        product.adicionais !== a.adicionais
      );
    });
    this.tiposList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.tiposList.next(this.cartItemList);
  }
}

export class ItemCarrinho {
  private id!: number;
  private tipo: string;
  private capacidade: number;
  private url_imagem: string;
  private preco: number;
  private qtd_sabores: number;
  private qtd_adicionais: number;
  private quantidade: number;
  private total: number;
  private sabores: Array<PegarSabor>;
  private adicionais: Array<Listadicional>;

  constructor(
    tipo: string,
    capacidade: number,
    url_imagem: string,
    preco: number,
    qtd_sabores: number,
    qtd_adicionais: number,
    quantidade: number,
    total: number
  ) {
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.url_imagem = url_imagem;
    this.preco = preco;
    this.qtd_sabores = qtd_sabores;
    this.qtd_adicionais = qtd_adicionais;
    this.quantidade = quantidade;
    this.total = total;
    this.sabores = [];
    this.adicionais = [];
  }

  // Cópdia das propriedades
  get getItem(): any {
    return { ...this };
  }

  // Obter o id
  get getId(): number {
    return this.id;
  }
  // Setar o id
  setId(id: number): void {
    this.id = id;
  }

  // Adicionar um sabor
  public pushSabor(sabor: PegarSabor): void {
    this.sabores.push(sabor);
  }
  // Apagar um sabor
  public deleteSabor(sabor: PegarSabor): void {
    let index = this.sabores.findIndex(
      (item) => sabor.nome == item.nome && sabor.tipo == item.tipo
    );
    if (index < 0) return;
    this.sabores.splice(index, 1);
  }

  // Adicionar um adicional no copo
  public pushAdicionais(nome: Listadicional): void {
    this.adicionais.push(nome);
  }
  // Remover um adicional do copo
  public deleteAdicionais(adicional: Listadicional): void {
    let index = this.adicionais.findIndex(
      (item) => adicional.nome == item.nome
    );
    if (index < 0) return;
    this.adicionais.splice(index, 1);
  }
}
