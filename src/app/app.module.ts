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
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'contact', component: ContactPageComponent },
    ]),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
