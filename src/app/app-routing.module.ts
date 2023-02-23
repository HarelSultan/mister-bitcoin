import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsPageComponent } from './pages/ContactDetailsPage/contact-details-page.component';
import { ContactEditPageComponent } from './pages/ContactEditPage/contact-edit-page.component';
import { ContactPageComponent } from './pages/ContactPage/contact-page.component';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { LoginSignupPageComponent } from './pages/LoginSignupPage/login-signup-page.component';
import { StatisticPageComponent } from './pages/StatisticPage/statistic-page.component';
import { AuthResolver } from './services/auth.resolver';
import { ContactResolver } from './services/contact.resolver';

const routes: Routes = [
  { path: 'auth', component: LoginSignupPageComponent },

  {
    path: 'statistic',
    component: StatisticPageComponent,
    resolve: { user: AuthResolver },
  },

  {
    path: 'contact/edit/:id',
    component: ContactEditPageComponent,
    resolve: { user: AuthResolver, contact: ContactResolver },
  },

  {
    path: 'contact/edit',
    component: ContactEditPageComponent,
    resolve: { user: AuthResolver },
  },

  {
    path: 'contact/:id',
    component: ContactDetailsPageComponent,
    resolve: { user: AuthResolver, contact: ContactResolver },
  },

  {
    path: 'contact',
    component: ContactPageComponent,
    resolve: { user: AuthResolver },
  },

  {
    path: '',
    component: HomePageComponent,
    resolve: { user: AuthResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
