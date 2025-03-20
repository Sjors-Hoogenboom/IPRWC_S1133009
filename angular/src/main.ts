import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { RegisterComponent } from './app/register/register.component';
import {provideHttpClient} from '@angular/common/http';
import {LoginComponent} from './app/login/login.component';
import {ProductsComponent} from './app/products/products.component';
import {AddProductComponent} from './app/add-product/add-product.component';
import {ShoppingCartComponent} from './app/shopping-cart/shopping-cart.component';
import {AdminGuard} from './guards/admin.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ProductsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
      { path: 'cart', component: ShoppingCartComponent },
      { path: '**', redirectTo: '' }
    ]),
  ]
}).catch(() => console.error());
