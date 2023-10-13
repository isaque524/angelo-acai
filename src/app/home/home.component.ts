import { FoodService } from './../services/food/food.service';
import { Component } from '@angular/core';
import { foods } from '../model/food';
import Swal from 'sweetalert2';
import { Route } from '@angular/router';
import { AdicionaisService } from '../services/Adicionais.service';
import { CartService, ItemCarrinho } from '../services/cart.service';
import { SaboresService } from '../services/sabores.service';
import { AcaiSorveteService } from '../services/tipos.service';
import { Listadicional } from '../model/adicional';
import { PegarSabor } from '../model/sabores';
import { EventEmitterService } from '../services/event-emitir.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  resultados: any = [];
  public LigaAcordion: boolean = false;
  public reiniciarClic: boolean = false;
  itemCarrinho!: ItemCarrinho;
  public tiposList: any;
  public tiposListclone: any;
  public SaborList: any;
  public adicionaisList: any;
  public estoque: boolean = false;
  public spinner: boolean = false;

  constructor(
    private tipo: AcaiSorveteService,
    private sabor: SaboresService,
    private adicionalComp: AdicionaisService,
    private cartService: CartService
  ) {
    EventEmitterService.get('Amostra header').emit('');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = true;
    }, 4000);
    this.tipo.getAcaiSorveteTodosTipos().subscribe((res) => {
      this.tiposList = res.resultados;
      this.tiposList.forEach((a: any) => {
        Object.assign(a, { quantidade: 1, total: a.preco });
      });
      this.tiposListclone = this.tiposList;
      ('');
    });
  }

  montarCopo(item: any) {
    this.LigaAcordion = true;
    this.reiniciarClic = false;
    this.itemCarrinho = new ItemCarrinho(
      item.tipo,
      item.capacidade,
      item.url_imagem,
      item.preco,
      item.qtd_sabores,
      item.qtd_adicionais,
      item.quantidade,
      item.total
    );

    this.chamarSorvete();
    this.chamarComplimentosAdicionais();
  }

  chamarSorvete() {
    this.sabor.getSabores().subscribe((res) => {
      this.SaborList = res.resultados;
      if ((this.SaborList.estoque = true)) {
        this.estoque = true;
      }
    });
  }

  adicionarSorvete(item: any) {
    let { qtd_sabores, sabores } = this.itemCarrinho.getItem;
    if (sabores.length < qtd_sabores) {
      item.clicado = true;
      let sabor: PegarSabor = { nome: item.nome, tipo: item.tipo };
      this.itemCarrinho.pushSabor(sabor);
    } else
      [
        Swal.fire({
          title: 'Voce atingiu a quantidade maxima de sabores!',
          icon: 'info',
          text: 'Remova um sabor para adicionar outro',
        }),
      ];
  }

  removerSorvete(item: any) {
    Swal.fire({
      title: 'Tem certeza que deseja Remover?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Remover',
    }).then((result) => {
      if (result.isConfirmed) {
        item.clicado = false;
        let sabor: PegarSabor = { nome: item.nome, tipo: item.tipo };
        this.itemCarrinho.deleteSabor(sabor);

        Swal.fire('Removido!', '', 'success');
      }
    });
  }

  /* clicAdd(item: any, index: number) {
    item.clicado = true;
  } */

  /* clicremover(item: any, index: number) {
    item.clicado = false;
  } */

  chamarComplimentosAdicionais(): void {
    this.adicionaisList = this.adicionalComp.getAll();
  }

  adicionarComplementos(item: any) {
    let { qtd_adicionais, adicionais } = this.itemCarrinho.getItem;
    if (adicionais.length < qtd_adicionais) {
      item.clicado = true;
      let nome: Listadicional = { nome: item.nome };
      this.itemCarrinho.pushAdicionais(nome);
    } else
      [
        Swal.fire({
          title: 'Voce atingiu a quantidade maxima de Adicionais!',
          icon: 'info',
          text: 'Remova um  para adicionar outro',
        }),
      ];
  }

  removerComplementos(item: any) {
    Swal.fire({
      title: 'Tem certeza que deseja Remover??',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Remover',
    }).then((result) => {
      if (result.isConfirmed) {
        item.clicado = false;
        let adicional: Listadicional = { nome: item.nome };
        this.itemCarrinho.deleteAdicionais(adicional);

        Swal.fire('Removido!', '', 'success');
      }
    });
  }

  montarCarrinho() {
    let { sabores } = this.itemCarrinho.getItem;
    if (sabores.length <= 0) {
      Swal.fire({
        title: 'Adicione pelo menos um sabor',
        icon: 'info',
      });
    } else {
      this.cartService.addtoCart(this.itemCarrinho);
      Swal.fire('Enviado!', '', 'success');
      this.LigaAcordion = false;
    }
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.tiposList = this.tiposListclone.filter((tipos: any) => {
      return tipos._id.toLowerCase().includes(value);
    });
  }

  reload(){
    window.location.reload()
  }

}
