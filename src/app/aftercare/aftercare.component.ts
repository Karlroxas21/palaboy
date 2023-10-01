import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

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
    this.http.get<any[]>('http://localhost:80/aftercare')
    .subscribe(after_care =>{
      this.after_care = after_care;
    });

    this.titleService.setTitle(this.title);
  }
}
