import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsPageComponent } from './pages/ContactDetailsPage/contact-details-page.component';
import { ContactEditPageComponent } from './pages/ContactEditPage/contact-edit-page.component';
import { ContactPageComponent } from './pages/ContactPage/contact-page.component';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { StatisticPageComponent } from './pages/StatisticPage/statistic-page.component';
import { ContactResolver } from './services/contact.resolver';

const routes: Routes = [
  { path: 'statistic', component: StatisticPageComponent },
  {
    path: 'contact/edit/:id',
    component: ContactEditPageComponent,
    resolve: { contact: ContactResolver },
  },
  { path: 'contact/edit', component: ContactEditPageComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolver },
  },
  { path: 'contact', component: ContactPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
