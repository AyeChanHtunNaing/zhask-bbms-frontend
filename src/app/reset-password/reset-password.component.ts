import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { user } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user:user=new user();
  constructor(private formBuilder: FormBuilder, private router : Router, private service : UserService) {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this.service.resetPsw(this.user).subscribe(
        responseData =>{
          if(responseData == false){
            alert("Failed!")
          }else{
            alert("Success!")
          }
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
