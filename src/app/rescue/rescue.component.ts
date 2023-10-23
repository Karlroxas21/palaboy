import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

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
    this.http.get<any[]>(`${environment.apiUrl}rescue`)
    .subscribe(rescue =>{
      this.rescue = rescue;
    })

    this.titleService.setTitle(this.title);
  }

}
