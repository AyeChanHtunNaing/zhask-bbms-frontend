import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {user} from "../models/user";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user:user=new user();
  constructor(private formBuilder: FormBuilder, private router : Router, private service : UserService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  //Add user form actions

  get f() {
    return this.registerForm.controls;
  }
  ngOnInit(): void {
  }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      // alert("hi registered ya dl")
      this.service.addUser(this.user).subscribe(
        temp =>{
          if(temp.email == "false"){
            alert("Email already exists!");
          }else if(temp === null){
            alert("Registration Failed");
          }else{
            alert("Successfully Registered");
            this.router.navigate(['/login']);
          }
        }
        );
    }
  }

}
