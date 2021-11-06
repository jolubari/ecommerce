import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/core/login/login.component";

//GUARDS
import { AuthGuard } from "./guards/auth.guard";
// COMPONENTS
import { IndexClientComponent } from './components/clients/index-client/index-client.component';
import { CreateClientComponent } from "./components/clients/create-client/create-client.component";
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { BalanceProductComponent } from './components/products/balance-product/balance-product.component';
import { CreateCouponComponent } from "./components/coupons/create-coupon/create-coupon.component";
import { IndexCouponComponent } from "./components/coupons/index-coupon/index-coupon.component";
import { EditCouponComponent } from "./components/coupons/edit-coupon/edit-coupon.component";
import { ConfigComponent } from './components/config/config.component';
import { VarietyProductComponent } from './components/products/variety-product/variety-product.component';
import { GalleryProductComponent } from './components/products/gallery-product/gallery-product.component';
import { CreateDiscountComponent } from './components/discounts/create-discount/create-discount.component';
import { EditDiscountComponent } from './components/discounts/edit-discount/edit-discount.component';
import { IndexDiscountComponent } from './components/discounts/index-discount/index-discount.component';
import { IndexContactComponent } from './components/contact/index-contact/index-contact.component';
import { ReviewsProductComponent } from "./components/products/reviews-product/reviews-product.component";
import { IndexSaleComponent } from './components/sales/index-sale/index-sale.component';
import { DetailsSaleComponent } from './components/sales/details-sale/details-sale.component';


const appRoute: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // no hace falta control de canActivate porque home lo ejecuta ya
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'panel', children: [
        // Clients
        {path: 'clients', component: IndexClientComponent, canActivate: [AuthGuard]},
        {path: 'client/register', component: CreateClientComponent, canActivate: [AuthGuard]},
        {path: 'client/:id', component: EditClientComponent, canActivate: [AuthGuard]},
        // Products
        {path: 'products', component: IndexProductComponent, canActivate: [AuthGuard]},
        {path: 'product/register', component: CreateProductComponent, canActivate: [AuthGuard]},
        {path: 'product/:id', component: EditProductComponent, canActivate: [AuthGuard]},
        // balance
        {path: 'product/balance/:id', component: BalanceProductComponent, canActivate: [AuthGuard]},
        // varieties product
        {path: 'product/varieties/:id', component: VarietyProductComponent, canActivate: [AuthGuard]},
        // gallery product
        {path: 'product/gallery/:id', component: GalleryProductComponent, canActivate: [AuthGuard]},
        // reviews
        {path: 'product/reviews/:id', component: ReviewsProductComponent, canActivate: [AuthGuard]},
        // coupons
        {path: 'coupons', component: IndexCouponComponent, canActivate: [AuthGuard]},
        {path: 'coupon/register', component: CreateCouponComponent, canActivate: [AuthGuard]},
        {path: 'coupon/:id', component: EditCouponComponent, canActivate: [AuthGuard]},
        // config
        {path: 'config', component: ConfigComponent, canActivate: [AuthGuard]},
        // discounts
        {path: 'discounts', component: IndexDiscountComponent, canActivate: [AuthGuard]},
        {path: 'discount/register', component: CreateDiscountComponent, canActivate: [AuthGuard]},
        {path: 'discount/:id', component: EditDiscountComponent, canActivate: [AuthGuard]},
        // contact
        {path: 'contact', component: IndexContactComponent, canActivate: [AuthGuard]},
        // sales
        {path: 'sales', component: IndexSaleComponent, canActivate: [AuthGuard]},
        {path: 'sale/:id', component: DetailsSaleComponent, canActivate: [AuthGuard]},
    ]},

    { path: 'login', component: LoginComponent }

];

export const appRoutingproviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);