import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { productKey } from './models/ProductKey';
import {take, subscribeOn} from 'rxjs/operators';
import { ShoppingCart } from './models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private create() {
   return  this.db.list('/shopping-carts').push({
dateCreated: new Date().getTime() });
  }

  async getCart(): Promise<AngularFireList<ShoppingCart>> {
  const cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-carts/' + cartId);
  }
  async getCartObservable(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
      return this.db.object('/shopping-carts/' + cartId);
    }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
      const result = await this.create();
       localStorage.setItem('cartId', result.key);
       return result.key;
  }

  async addToCart(product) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId , product.key);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      if (i.payload.val()) {
        item.update({ product: product, quantity: i.payload.val().quantity + 1 });
      } else {
        item.set({ product: product, quantity: 1 });
      }
    });
  }
 async removeFromCart(product) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId , product.key);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
        item.update({ product: product, quantity: (i.payload.val().quantity || 0 ) - 1 });
    });
  }
  constructor(private db: AngularFireDatabase) { }
}
