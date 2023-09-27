import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AdminRescueService } from './admin-rescue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-rescue',
  templateUrl: './admin-rescue.component.html',
  styleUrls: ['./admin-rescue.component.css']
})
export class AdminRescueComponent implements OnInit {
  rescue: any;

  titlePage = "Admin: Rescue";

  title: string[] = [];
  box_1: string[] = [];
  box_2: string[] = [];
  box_3: string[] = [];
  box_4: string[] = [];
  box_5: string[] = [];
  box_6: string[] = [];

  isThereAnyChanges: boolean = false;

  constructor(private http: HttpClient,
    private titleService: Title,
    private AdminRescueService: AdminRescueService,
    private router: Router) { }
 

  arrayPusher(refArray: string[], size: number, property: string) {
    for (let i = 0; i < size; i++) {
      const propertyName = property
      refArray.push(this.rescue[0][propertyName][i]);
    }
  }
  
  getData(): void{
    this.AdminRescueService.getData().subscribe(incoming_data =>{
      this.rescue = incoming_data;

      this.arrayPusher(this.title, 2, "title");

      // Box 1
      this.arrayPusher(this.box_1, 9, "box_1");

      // Box 2
      this.arrayPusher(this.box_2, 3, "box_2");

      // Box 3
      this.arrayPusher(this.box_3, 2, "box_3");

      // Box 4
      this.arrayPusher(this.box_4, 6, "box_4");

      // Box 5
      this.arrayPusher(this.box_5, 6, "box_5");

      // Box 6
      this.arrayPusher(this.box_6, 2, "box_6");
    })
  }

  updateData(): void{
    if(this.isAnyChanges()){
      this.AdminRescueService.updateData(this.rescue[0]).subscribe(updatedData =>{
        this.router.navigate(['/admin-rescue']);
        
        // Toaster here
        console.log('Update success', updatedData);
      }, (err) =>{
        // Toaster here
        console.error("Error updating item. ", err);
      })
      this.isThereAnyChanges = false;
    }else{
      // Toaster here
      console.log('No changes were made.');
    }
  }

  isAnyChanges(){
    return this.isThereAnyChanges;
  }

  ngOnInit() {
    this.getData();

    this.titleService.setTitle(this.titlePage);
  }

  editing_title: boolean [] = [false, false];

  editing_box_1: boolean [] = [false, false, false, false, false, false, false, false, false];

  editing_box_2: boolean [] = [false, false, false];

  editing_box_3: boolean [] = [false, false];

  editing_box_4: boolean [] = [false, false, false, false, false, false];

  editing_box_5: boolean [] = [false, false, false, false, false, false];

  editing_box_6: boolean [] = [false, false];

  // Title Edit
  startEditingTitle(index: number){
    this.editing_title[index] = true;
  }
  finishEditingTitle(index: number, event: any){
    this.editing_title[index] = false;
    this.title[index] = event.target.value;
  }

  // Box 1 Edit
  startEditingBox1(index: number){
    this.editing_box_1[index] = true;
  }
  finishEditingBox1(index: number, event: any){
    this.editing_box_1[index] = false;
    this.box_1[index] = event.target.value;
  }

  // Box 2 Edit
  startEditingBox2(index: number){
    this.editing_box_2[index] = true;
  }
  finishEditingBox2(index: number, event: any){
    this.editing_box_2[index] = false;
    this.box_2[index] = event.target.value;
  }

  // Box 3 Edit
  startEditingBox3(index: number){
    this.editing_box_3[index] = true;
  }
  finishEditingBox3(index: number, event: any){
    this.editing_box_3[index] = false;
    this.box_3[index] = event.target.value;
  }

  // Box 4 Edit
  startEditingBox4(index: number){
    this.editing_box_4[index] = true;
  }
  finishEditingBox4(index: number, event: any){
    this.editing_box_4[index] = false;
    this.box_4[index] = event.target.value;
  }

  // Box 5 Edit
  startEditingBox5(index: number){
    this.editing_box_5[index] = true;
  }
  finishEditingBox5(index: number, event: any){
    this.editing_box_5[index] = false;
    this.box_5[index] = event.target.value;
  }

  // Box 6 Edit
  startEditingBox6(index: number){
    this.editing_box_6[index] = true;
  }
  finishEditingBox6(index: number, event: any){
    this.editing_box_6[index] = false;
    this.box_6[index] = event.target.value;
  }

  doesChange(){
    this.isThereAnyChanges = true;
  }
}
