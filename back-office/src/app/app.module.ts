import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';
import { LoginComponent } from './components/core/login/login.component';
import { IndexClientComponent } from './components/clients/index-client/index-client.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { BalanceProductComponent } from './components/products/balance-product/balance-product.component';
import { CreateCouponComponent } from './components/coupons/create-coupon/create-coupon.component';
import { IndexCouponComponent } from './components/coupons/index-coupon/index-coupon.component';
import { EditCouponComponent } from './components/coupons/edit-coupon/edit-coupon.component';
import { ConfigComponent } from './components/config/config.component';
import { VarietyProductComponent } from './components/products/variety-product/variety-product.component';
import { GalleryProductComponent } from './components/products/gallery-product/gallery-product.component';
import { CreateDiscountComponent } from './components/discounts/create-discount/create-discount.component';
import { EditDiscountComponent } from './components/discounts/edit-discount/edit-discount.component';
import { IndexDiscountComponent } from './components/discounts/index-discount/index-discount.component';
import { IndexContactComponent } from './components/contact/index-contact/index-contact.component';
import { ReviewsProductComponent } from './components/products/reviews-product/reviews-product.component';
import { IndexSaleComponent } from './components/sales/index-sale/index-sale.component';
import { DetailsSaleComponent } from './components/sales/details-sale/details-sale.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    IndexClientComponent,
    CreateClientComponent,
    EditClientComponent,
    CreateProductComponent,
    IndexProductComponent,
    EditProductComponent,
    BalanceProductComponent,
    CreateCouponComponent,
    IndexCouponComponent,
    EditCouponComponent,
    ConfigComponent,
    VarietyProductComponent,
    GalleryProductComponent,
    CreateDiscountComponent,
    EditDiscountComponent,
    IndexDiscountComponent,
    IndexContactComponent,
    ReviewsProductComponent,
    IndexSaleComponent,
    DetailsSaleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    routing,
    NgxTinymceModule.forRoot({
      baseURL: '../assets/tinymce/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
