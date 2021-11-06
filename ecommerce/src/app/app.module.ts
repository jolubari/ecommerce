import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { routing } from "./app.routing";
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/core/nav/nav.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { LoginComponent } from './components/core/login/login.component';
import { ProfileUserComponent } from './components/user/profile-user/profile-user.component';
import { SidebarComponent } from './components/user/sidebar/sidebar.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'ng-starrating';


import { DetailViewComponent } from './components/products/detail-view/detail-view.component';
import { MycurrencyPipe } from './pipes/custom-currency.pipe';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/user/address/address.component';
import { ApplyDiscountPipe } from './pipes/appy-discount.pipe';
import { ContactComponent } from './components/contact/contact.component';
import { IndexOrdersComponent } from './components/user/orders/index-orders/index-orders.component';
import { DetailsOrderComponent } from './components/user/orders/details-order/details-order.component';
import { IndexReviewComponent } from './components/user/reviews/index-review/index-review.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    ProfileUserComponent,
    SidebarComponent,
    IndexProductComponent,
    DetailViewComponent,
    //pipes
    MycurrencyPipe,
    CartComponent,
    AddressComponent,
    ApplyDiscountPipe,
    ContactComponent,
    IndexOrdersComponent,
    DetailsOrderComponent,
    IndexReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
