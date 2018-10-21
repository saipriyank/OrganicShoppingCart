import { Component, OnInit, Input } from '@angular/core';
import { productKey as Product } from '../models/productKey';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
// tslint:disable-next-line:no-input-rename
@Input('product') product: Product;
// tslint:disable-next-line:no-input-rename
@Input('show-actions') showActions = true;
// tslint:disable-next-line:no-input-rename
@Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  getQuantity() {
    if (!this.shoppingCart) { return 0; }
    const item = this.shoppingCart[1][this.product.key];
    return item ? item.quantity : 0;
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
