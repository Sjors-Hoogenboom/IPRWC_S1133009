import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { RegisterComponent } from './app/register/register.component';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
    ]),
  ]
}).catch(err => console.error(err));
