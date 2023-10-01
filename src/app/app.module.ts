import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AftercareComponent } from './aftercare/aftercare.component';
import { RescueComponent } from './rescue/rescue.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AdminRescueComponent } from './admin-rescue/admin-rescue.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminAfterCareComponent } from './admin-after-care/admin-after-care.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutusComponent,
    AftercareComponent,
    RescueComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    AdminRescueComponent,
    AdminPanelComponent,
    AdminAfterCareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
