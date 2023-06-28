import { Injectable } from '@angular/core';
import { adicional } from '../model/adicional';

@Injectable({
  providedIn: 'root',
})
export class AdicionaisService {
  constructor() {}

  getAll(): adicional[] {
    return [
      {
        imagem:
          'https://uvn-brightspot.s3.amazonaws.com/assets/vixpt/p/pacoca-doce-farelo-0620-1400x800.jpg',
        nome: 'Paçoca',
      },
      {
        imagem:
          'https://images.tcdn.com.br/img/img_prod/758670/amendoim_torrado_sem_sal_100g_109_1_20200514142306.jpg',
        nome: 'Amendoin',
      },
      {
        imagem:
          'https://cdn.awsli.com.br/300x300/405/405484/produto/107135221/a6bb03e08d.jpg',
        nome: 'Leite em Pó',
      },
      {
        imagem:
          'https://imageswscdn.wslojas.com.br/files/24534/sucrilhos-corn-sugar-cacucar-2-kg-pacote-60-1.jpg',
        nome: 'Sucrilhos',
      },
      {
        imagem:
          'https://www.emporiorosa.com.br/media/catalog/product/cache/1/image/800x/9df78eab33525d08d6e5fb8d27136e95/c/h/choco-power-ball-chocolate-granel-emporio-rosa.jpg',
        nome: 'Chocoball',
      },
      {
        imagem:
          'https://static.tuasaude.com/media/article/yq/fs/aveia_59113_l.jpg',
        nome: 'Aveia',
      },
      {
        imagem:
          'https://cdn.shopify.com/s/files/1/0560/3632/7624/products/r_00000012_24072016171102_52074563-176d-4201-8c3f-d68bdcd70a3f.jpg?v=1626801541',
        nome: 'Granola',
      },
    ];
  }
}
