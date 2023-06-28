import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  searchTerm: string = '';
  /* carroCompra!: CarrinhoCompra;
  itemCarrinho!: ItemCarrinho; */

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalItem = res.length;
    });
  }
}
