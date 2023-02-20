import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactPageComponent } from './pages/ContactPage/contact-page.component';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { ContactListComponent } from './components/ContactList/contact-list.component';
import { ContactPreviewComponent } from './components/ContactPreview/contact-preview.component';
import { AppHeaderComponent } from './components/AppHeader/app-header.component';
import { AppFooterComponent } from './components/AppFooter/app-footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailsPageComponent } from './pages/ContactDetailsPage/contact-details-page.component';
import { StatisticPageComponent } from './pages/StatisticPage/statistic-page.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ContactFilterComponent } from './components/ContactFilter/contact-filter.component';
import { ContactEditPageComponent } from './pages/ContactEditPage/contact-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsPageComponent,
    StatisticPageComponent,
    ContactFilterComponent,
    ContactEditPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
