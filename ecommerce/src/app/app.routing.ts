import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/core/login/login.component";
import { ProfileUserComponent } from './components/user/profile-user/profile-user.component';
import { AuthGuard } from "./guards/auth.guard";
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { DetailViewComponent } from './components/products/detail-view/detail-view.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/user/address/address.component';
import { ContactComponent } from './components/contact/contact.component';
import { IndexOrdersComponent } from './components/user/orders/index-orders/index-orders.component';
import { DetailsOrderComponent } from './components/user/orders/details-order/details-order.component';
import { IndexReviewComponent } from './components/user/reviews/index-review/index-review.component';

const appRoute: Routes = [
{path: '', component: HomeComponent},
// USER
{path: 'login', component: LoginComponent},
{path: 'account/profile', component: ProfileUserComponent, canActivate:[AuthGuard]},
{path: 'account/orders', component: IndexOrdersComponent, canActivate:[AuthGuard]},
{path: 'account/order/:id', component: DetailsOrderComponent, canActivate:[AuthGuard]},
{path: 'account/reviews', component: IndexReviewComponent, canActivate:[AuthGuard]},

// ADDRESS
{path: 'account/addresses', component: AddressComponent, canActivate:[AuthGuard]},
// CARRITO
{path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
// PRODUCTS
{path: 'products', component: IndexProductComponent},
{path: 'products/category/:category', component: IndexProductComponent},
{path: 'product/details/:slug', component: DetailViewComponent},
// CONTACT
{path: 'contact', component: ContactComponent},

];

export const appRoutingproviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);