import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private urlAPI = `${environment.apiUrl}login`;


  username: string = '';
  password: string = '';

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService){}

  login(){
    const formData = {
      username: this.username,
      password: this.password
    }
    
    this.http.post(`${this.urlAPI}`, formData).subscribe((response: any) =>{
      localStorage.setItem('token', response.token);

      this.toastr.success('Logged in');
      this.router.navigate(['/admin-rescue']);
    },(error) =>{
      this.toastr.error("Invalid username or password");
      console.error(error);
    })
  }



}
