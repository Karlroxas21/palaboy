import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-aftercare',
  templateUrl: './aftercare.component.html',
  styleUrls: ['./aftercare.component.css']
})
export class AftercareComponent {
  after_care: any;
  title = "Palaboy: After Care";

  constructor(private http: HttpClient, private titleService: Title){}

  ngOnInit(): void{
    this.http.get<any[]>(`${environment.apiUrl}aftercare`)
    .subscribe(after_care =>{
      this.after_care = after_care;
    });

    this.titleService.setTitle(this.title);
  }
}
