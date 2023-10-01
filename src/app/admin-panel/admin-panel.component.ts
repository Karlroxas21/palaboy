import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { AdminAfterCareComponent } from '../admin-after-care/admin-after-care.component';
import { AdminRescueComponent } from '../admin-rescue/admin-rescue.component';

import { ToastrService } from 'ngx-toastr';

const routes: Routes = [
  {component: AdminAfterCareComponent, path:'/admin-aftercare'},
  {component: AdminRescueComponent, path:'/admin-rescue'}
]
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  constructor(private router: Router,
    private toastr: ToastrService){}

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.toastr.info("Logged out");
  }

}
