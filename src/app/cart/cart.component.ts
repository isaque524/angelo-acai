import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import * as html2pdf from 'html2pdf.js';
import * as JsonToXML from 'js2xmlparser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  public contarAdicionais: boolean = false;
  public hidden: boolean = false;
  constructor(private cartService: CartService, public router: Router) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  LimparCarrinho() {
    this.cartService.removeAllCart();
  }

  Dowload() {
    var element = document.getElementById('pedido');

    var opt = {
      margin: [10, 10, 10, 10],
      filename: 'pedido.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    console.log(JsonToXML.parse('person', this.products));
    html2pdf().from(element).set(opt).save();

    Swal.fire({
      title: 'Enviado com sucesso',
      text: 'Aguarde enquanto o pdf estiver sendo criado',
      icon: 'success',
      timer: 4000,
      showConfirmButton: false,
      showCancelButton: false,
    }).then(() => {
      this.router.navigate(['/products']);
      this.cartService.removeAllCart();
    });
  }
}
