import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../models/user";
import { UserService } from '../services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user:User=new User();
  constructor(private formBuilder: FormBuilder, private router : Router, private service : UserService) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required], Validators.email],
      password: ['', [Validators.required,Validators.minLength(8)]],
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
          console.log(temp);
          if(temp.email == "false"){
            //alert("Email already exists!");
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email already exists!!!',
            })
          }else if(temp === null){
            //  alert("Registration Failed");
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Registration Failed!!!',
            })
          }else{
            //  alert("Successfully Registered");
            this.router.navigate(['/login']);
            Swal.fire({
              title: 'Registered successfully. Check your email to verify account',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })

          }
        }
        );
    }
  }

}
