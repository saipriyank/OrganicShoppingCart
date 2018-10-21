import { shoppingCartItem } from './ShoppingCartItem';

export class ShoppingCart {
    items: shoppingCartItem[];

    constructor(items: shoppingCartItem[]) {
        this.items = items;
    }

    get productIds() {
      return Object.keys(this.items);
    }
    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (const abc in this.items) {
            count += this.items[abc].quantity;
        }
        return count;
    }
}
