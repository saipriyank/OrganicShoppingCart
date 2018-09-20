import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { productKey } from './models/ProductKey';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private create() {
   return  this.db.list('/shopping-carts').push({
dateCreated: new Date().getTime() });
  }

  private getCart(cartId: string) {
    return this.db.list('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
      const result = await this.create();
       localStorage.setItem('cartId', result.key);
       return result.key;
  }

 async addToCart(product: productKey) {
    // const cartId = await this.getOrCreateCartId();
    // const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.Key).v;
    // item$.take(1)
  }
  constructor(private db: AngularFireDatabase) { }
}
