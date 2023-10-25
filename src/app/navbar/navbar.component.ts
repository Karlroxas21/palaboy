import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'palaboy';

  hideNavbar = false;
  hideNavbarPages= ['/login', '/admin-rescue', '/admin-aftercare'];

  constructor(private router: Router){
    router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.checkHideNavbar(event.url);
      }
    });
  }

  private checkHideNavbar(url: string): void{
    this.hideNavbar = this.hideNavbarPages.includes(url);
  }
}
