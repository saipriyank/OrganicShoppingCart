import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { map, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoriesObser$;
  product = <any>{};
  id;
    constructor(
      categoryService: CategoryService,
      private productService: ProductService,
      private router: Router,
    private route: ActivatedRoute) {

    // categoryService.getCategories().snapshotChanges(['child_added'])
    // .subscribe(actions => {
    // this.categories$ = actions; });
    this.categoriesObser$ =  categoryService.getCategories().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(x => this.product = x);
      }
   }

   save(product) {
     if (this.id) { this.productService.updateProduct(this.id, product); } else {
      this.productService.create(product); }
      this.router.navigate(['/admin/products']);
   }
  delete() {
    if ( confirm('Are you sure you what to delete this product') ) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
