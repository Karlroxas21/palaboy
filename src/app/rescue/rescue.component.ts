import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.css']
})
export class RescueComponent {
  rescue: any;
  title = "Palboy: Rescue";

  constructor(private http: HttpClient,
    private titleService: Title){}

  ngOnInit(): void{
    this.http.get<any[]>('http://localhost:80/rescue')
    .subscribe(rescue =>{
      this.rescue = rescue;
    })

    this.titleService.setTitle(this.title);
  }

}
