import { Injectable } from '@angular/core';
import { foods } from 'src/app/model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():foods[]{
    return[
      {image:'assets/acai-e-sorvete-1583790894836_v2_450x337.jpg',nome:'Açai e Sorvete',sabores:true },
      {image:'assets/icone-de-sorvete_340607-63 (1).png',nome:'Sejam bem vindos',sabores:false },
      {image:'assets/banana-split.jpg',nome:'Banana Split',sabores:true },
      {image:'assets/Barca.jpg',nome:'Barca',sabores:true },
      {image:'assets/hot-fudge-sundae-gold-brick-1-Rev1.webp',nome:'Sundae',sabores:true},
      {image:'assets/MilkShake.jpg',nome:'Milkshake',sabores:true}

    ]
  }


}
