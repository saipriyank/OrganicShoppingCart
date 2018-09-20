import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import {switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { product } from '../models/product';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  products: product[] = [];
  filteredProducts: product[] = [];
  category: string;
    constructor( productService: ProductService, route: ActivatedRoute ) {
      productService.getAll().valueChanges()
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
}
