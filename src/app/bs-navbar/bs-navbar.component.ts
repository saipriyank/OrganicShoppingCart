import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/ShoppingCart';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  // shoppingCartItemCount: number;
  cartObservable: Observable<ShoppingCart>;
  async ngOnInit() {
    this.cartObservable = await this.cartService.getCartObservable()
    .then(abc => abc.valueChanges().pipe(map(pqr => new ShoppingCart(pqr.items) )));
    // const cart$ = await this.cartService.getCart();
    // cart$.valueChanges().subscribe(cart  => {
    //   if (cart) {
    //   this.shoppingCartItemCount = 0;
    //     // tslint:disable-next-line:forin
    //     for (const abc in cart[1]) {
    //       this.shoppingCartItemCount += cart[1][abc].quantity;
    //     }
    //   }
    // });
  }
  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
    auth.appUSer$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

}
