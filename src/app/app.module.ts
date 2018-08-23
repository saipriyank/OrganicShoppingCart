import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGaurd } from './auth-gaurd.service';
import { UserService } from './user.service';
import { AdminAuthGaurd } from './admin-auth-gaurd.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    MyOrdersComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    LoginComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path : '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'products', component: ProductsComponent },
      {path: 'shopping-cart', component: ShoppingCartComponent},

      {path: 'my-orders', component: MyOrdersComponent , canActivate: [AuthGaurd] },
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGaurd] },
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGaurd]  },

      {path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGaurd, AdminAuthGaurd] },
      {path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGaurd, AdminAuthGaurd], }
    ])
  ],
  providers: [
    AuthService,
    AuthGaurd,
  UserService,
  AdminAuthGaurd,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }