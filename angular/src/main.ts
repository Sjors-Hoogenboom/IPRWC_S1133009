import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { RegisterComponent } from './app/register/register.component';
import {provideHttpClient} from '@angular/common/http';
import {LoginComponent} from './app/login/login.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]),
  ]
}).catch(err => console.error());
