import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import {switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { productKey as product } from '../models/ProductKey';
import { ShoppingCartService } from '../shopping-cart.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: product[] = [];
  filteredProducts: product[] = [];
  category: string;
  cart: any;
  subscription: any;
    constructor( productService: ProductService, route: ActivatedRoute,  private cartService: ShoppingCartService ) {
      productService.getAll()
      .pipe(switchMap(prods => {
        this.products = prods;
        return route.queryParamMap;
      })).subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
        });

   }
    async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
    }
    // after subscripting the component it needs to be destroyed.
    ngOnDestroy() {
    this.subscription.unsubscribe();
    }
}
