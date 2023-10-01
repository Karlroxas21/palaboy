import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


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
    
    this.http.post('http://localhost:80/login', formData).subscribe((response: any) =>{
      localStorage.setItem('token', response.token);

      this.toastr.success('Logged in');
      this.router.navigate(['/admin-rescue']);
    },(error) =>{
      this.toastr.error("Invalid username or password");
      console.error(error);
    })
  }



}
