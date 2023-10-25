import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AftercareComponent } from './aftercare/aftercare.component';
import { RescueComponent } from './rescue/rescue.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AdminRescueComponent } from './admin-rescue/admin-rescue.component';
import { AdminAfterCareComponent } from './admin-after-care/admin-after-care.component';

import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {component: HomeComponent, path: ''},
      {component: AboutusComponent, path: 'aboutus'},
      {component: AftercareComponent, path: 'aftercare'},
      {component: RescueComponent, path: 'rescue'},
      {component: ContactComponent, path: 'contact'},
      {component: LoginComponent, path: 'login'},
      {component: AdminRescueComponent, path: 'admin-rescue', canActivate: [AuthGuard]},
      {component: AdminAfterCareComponent, path: 'admin-aftercare', canActivate: [AuthGuard]}
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
