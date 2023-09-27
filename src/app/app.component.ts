import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'palaboy';

  hideNavbar = false;
  hideNavbarPages= ['/login', '/admin-rescue'];

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
