import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AftercareComponent } from './aftercare/aftercare.component';
import { RescueComponent } from './rescue/rescue.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AdminRescueComponent } from './admin-rescue/admin-rescue.component';

const routes: Routes = [
  {component: HomeComponent, path: ''},
  {component: AboutusComponent, path: 'aboutus'},
  {component: AftercareComponent, path: 'aftercare'},
  {component: RescueComponent, path: 'rescue'},
  {component: ContactComponent, path: 'contact'},
  {component: LoginComponent, path: 'login'},
  {component: AdminRescueComponent, path: 'admin-rescue'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
