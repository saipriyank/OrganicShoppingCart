import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';
import { productKey } from '../../models/ProductKey';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  productArry: productKey[];
  subscription: Subscription;
  tableResource: DataTableResource<productKey>;
  items: productKey[] = [];
  itemsCount: number;

  constructor( private productService: ProductService) {
   this.subscription =  this.productService.getAll().pipe(
    map(changes => changes.map(c => ({ key: c.key, category: c.category, imageUrl: c.imageUrl, title: c.title, price: c.price }))))
   .subscribe(products => {
     this.productArry = products;
     this.initializeTable(this.productArry);
    });
   }

   private initializeTable(products: productKey[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset : 10}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemsCount = count);
   }

   reloadItems(params) {
     if (this.tableResource) {
       this.tableResource.query(params).then(items => this.items = items);
      }
   }

   filter(query: string) {
     const filteredProducts = (query) ?
     this.productArry.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
     this.productArry;
     this.initializeTable(filteredProducts);
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
