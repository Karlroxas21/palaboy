import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  private urlAPI = `${environment.apiUrl}`;

  contactForm: FormGroup;

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private http: HttpClient){
    this.contactForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      subject:['', [Validators.required, Validators.maxLength(20)]],
      message:['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  ngOnInit(){}

  onSubmit(){
    if(this.contactForm.valid){
      const formData = this.contactForm.value;
      this.http.post(`${this.urlAPI}contact_form`, formData).subscribe((res)=>{
        this.toastr.success("Submitted successfuly");
        this.contactForm.reset();
      })
    }else{
      this.toastr.error("Error");
    }
  }

}
